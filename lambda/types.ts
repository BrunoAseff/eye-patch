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

export type EmailData = {
  target: Target;
  httpStatus?: number | null;
  error?: Error | null;
};
