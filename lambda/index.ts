import { Email } from './email';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import type { HealthCheckResult } from './types';
import { checkHealth } from './checks/checkHealth';
import { updateBadges } from './badges';

const sns = new SNSClient();
const topicArn: string | undefined = process.env.TOPIC_ARN;

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
    emailsToSend
      .filter((email): email is string => email !== null)
      .map((email) =>
        sns.send(
          new PublishCommand({
            TopicArn: topicArn,
            Subject: 'EyePatch - Alerta de Status',
            Message: email,
          }),
        ),
      ),
  );

  await updateBadges(results);

  console.log(`E-mails enviados: ${emailsToSend.filter(Boolean).length}`);
}

export const handler = async (): Promise<void> => {
  await sendEmail();
};
