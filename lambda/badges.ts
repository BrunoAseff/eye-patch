import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import type { HealthCheckResult } from './types';

const s3 = new S3Client();
const bucket = process.env.BADGE_BUCKET;

export async function updateBadges(results: HealthCheckResult[]) {
  if (!bucket) throw new Error('BADGE_BUCKET is not set');

  for (const result of results) {
    const isUp = result.status !== 'rejected';

    const badge = {
      schemaVersion: 1,
      label: 'status',
      message: isUp ? 'operational' : 'offline',
      color: isUp ? 'green' : 'red',
    };

    const key = `badges/${result.target.label}.json`;

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(badge),
        ContentType: 'application/json',
      }),
    );

    console.log(`✅ Badge atualizado: ${key}`);
  }
}
