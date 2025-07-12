import { Email } from './email';
import { Target, targets } from './targets';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

interface HealthCheckResult {
  target: Target;
  status: 'fulfilled' | 'rejected';
  httpStatus: number | null;
  error: Error | null;
}

interface FulfilledResult {
  status: 'fulfilled';
  value: Response;
}

interface RejectedResult {
  status: 'rejected';
  reason: Error;
}

type PromiseSettledResult = FulfilledResult | RejectedResult;

const sns = new SNSClient();
const topicArn: string | undefined = process.env.TOPIC_ARN;

async function checkHealth(): Promise<HealthCheckResult[]> {
  const results: PromiseSettledResult[] = await Promise.allSettled(
    targets.map((target: Target) => fetch(target.url)),
  );

  const responses: HealthCheckResult[] = results.map(
    (res: PromiseSettledResult, index: number) => {
      const target: Target = targets[index];

      if (res.status === 'fulfilled') {
        console.log(
          `[OK] ${target.name} - ${target.url} -> ${res.value.status}`,
        );
        return {
          target,
          status: 'fulfilled',
          httpStatus: res.value.status,
          error: null,
        };
      } else {
        console.error(`[FAIL] ${target.name} - ${target.url} -> ${res.reason}`);
        return {
          target,
          status: 'rejected',
          httpStatus: null,
          error: res.reason,
        };
      }
    },
  );

  return responses;
}

async function generateEmail(
  results: HealthCheckResult[],
): Promise<(string | null)[]> {
  return results.map(
    ({
      status,
      target,
      httpStatus,
      error,
    }: HealthCheckResult): string | null =>
      status === 'rejected' ? Email({ target, httpStatus, error }) : null,
  );
}

async function sendEmail(): Promise<void> {
  const results: HealthCheckResult[] = await checkHealth();
  const emailsToSend: (string | null)[] = await generateEmail(results);

  if (!emailsToSend || emailsToSend.every((e: string | null) => e === null)) {
    console.log('Nenhuma falha detectada. Nenhum e-mail enviado.');
    return;
  }

  if (!topicArn) {
    throw new Error('TOPIC_ARN environment variable is not set');
  }

  await Promise.all(
    emailsToSend.filter(Boolean).map((email: string | null) =>
      sns.send(
        new PublishCommand({
          TopicArn: topicArn,
          Subject: 'EyePatch - Alerta de Status',
          Message: email!,
        }),
      ),
    ),
  );

  console.log(`E-mails enviados: ${emailsToSend.filter(Boolean).length}`);
}

export const handler = async (): Promise<void> => {
  await sendEmail();
};
