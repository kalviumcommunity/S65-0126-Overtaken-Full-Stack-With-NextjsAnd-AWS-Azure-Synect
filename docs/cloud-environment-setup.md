# Cloud Environment Setup (2.40)

This guide defines how Synect secrets and runtime config should be managed in cloud environments.

## Secret management policy

- Do not commit real credentials to git.
- Use managed secrets (AWS Secrets Manager) or platform env vars.
- Keep `.env.example` as placeholders only.

## Required environment variables

- `DATABASE_URL` (RDS production URL with `sslmode=require`)
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_ISSUER`
- `JWT_AUDIENCE`
- `REDIS_URL`
- `REDIS_TTL_SECONDS`
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET`
- `AWS_SES_FROM_EMAIL`
- `CORS_ORIGIN`
- `FORCE_HTTPS`
- `NODE_ENV=production`

## Deployment note

- Application must read config only from environment variables.
- No runtime secret fallback to hardcoded values in production.
