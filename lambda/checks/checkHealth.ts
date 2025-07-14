import { targets } from '../targets';
import type { HealthCheckResult, Target } from '../types';

export async function checkHealth(): Promise<HealthCheckResult[]> {
  const results: PromiseSettledResult<Response>[] = await Promise.allSettled(
    targets.map((target: Target) => fetch(target.url)),
  );

  const responses: HealthCheckResult[] = results.map(
    (res: PromiseSettledResult<Response>, index: number) => {
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
          error:
            res.reason instanceof Error
              ? res.reason
              : new Error(String(res.reason)),
        };
      }
    },
  );

  return responses;
}
