import { Email } from './email';
import { targets } from './targets';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient();
const topicArn = process.env.TOPIC_ARN;

async function checkHealth() {
  const responses = await Promise.all(
    targets.map((target) => fetch(target.url)),
  );

  return responses.map((response) => response.status);
}

async function generateEmail() {
  const result = await checkHealth();

  return result.map((response, index) =>
    Number(response) !== 200 ? Email({ target: targets[index] }) : null,
  );
}

async function sendEmail() {
  const emailsToSend = await generateEmail();

  if (!emailsToSend || emailsToSend.every((e) => e === null)) return;

  await Promise.all(
    emailsToSend.filter(Boolean).map((email) =>
      sns.send(
        new PublishCommand({
          TopicArn: topicArn,
          Subject: 'EyePatch - Alerta de Status',
          Message: email ?? undefined,
        }),
      ),
    ),
  );
}

export const handler = async () => {
  await sendEmail();
};

if (require.main === module) {
  handler();
}
