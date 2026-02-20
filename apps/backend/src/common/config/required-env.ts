const requiredBaseEnv = [
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_ISSUER",
  "JWT_AUDIENCE",
  "CORS_ORIGIN",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_S3_BUCKET",
  "AWS_SES_FROM_EMAIL",
] as const;

export function assertRequiredEnv() {
  const missing = requiredBaseEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
