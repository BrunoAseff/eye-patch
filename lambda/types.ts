export type Target = {
  type: 'api' | 'web';
  name: string;
  url: string;
};

export interface HealthCheckResult {
  target: Target;
  status: 'fulfilled' | 'rejected';
  httpStatus: number | null;
  error: Error | null;
}
export interface FulfilledResult {
  status: 'fulfilled';
  value: Response;
}
export interface RejectedResult {
  status: 'rejected';
  reason: Error;
}

export type PromiseSettledResult = FulfilledResult | RejectedResult;

export type EmailData = {
  target: Target;
  httpStatus?: number | null;
  error?: Error | null;
};
