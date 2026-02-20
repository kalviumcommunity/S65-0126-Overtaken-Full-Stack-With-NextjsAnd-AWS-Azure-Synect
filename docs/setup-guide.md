# Synect Setup Guide

This guide covers local development setup for backend, frontend, database, tests, and quality checks.

## Prerequisites

- Bun 1.2+
- Node.js 20+
- Docker Desktop (running)
- Git

## Install dependencies

From repository root:

```bash
bun install
```

## Backend local setup

1. Copy backend environment file:

```bash
cp apps/backend/.env.example apps/backend/.env
```

2. Confirm local development values in `apps/backend/.env`:

```env
DATABASE_URL="postgresql://synect_user:synect_password@localhost:5432/synect_db?schema=public"
PORT=3001
JWT_SECRET="replace-with-a-strong-secret"
JWT_EXPIRES_IN="15m"
JWT_ISSUER="synect-api"
JWT_AUDIENCE="synect-web"
REDIS_URL="redis://localhost:6379"
```

3. Start local services:

```bash
docker compose -f apps/backend/docker-compose.yml up -d
```

4. Run migrations and generate Prisma client:

```bash
bun run --cwd apps/backend db:migrate:dev -- --name init_local
bun run --cwd apps/backend db:generate
```

5. Start backend server:

```bash
bun run dev:backend
```

Backend base URL: `http://localhost:3001`

## Frontend local setup

1. Copy frontend environment file:

```bash
cp apps/frontend/.env.example apps/frontend/.env.local
```

2. Set the API URL in `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

3. Start frontend:

```bash
bun run dev:frontend
```

Frontend URL: `http://localhost:3000`

## Local validation commands

From repository root:

```bash
bun run lint
bun run build
bun run test:frontend
bun run test
bun run test:e2e
bun run test:ci
```

## Quick health checks

- Backend health: `GET http://localhost:3001/api/health`
- CI parity command: `bun run test:ci`

## Common troubleshooting

- `P1000 Authentication failed`
  - Recheck `DATABASE_URL` username/password/database
  - Confirm containers are running: `docker compose -f apps/backend/docker-compose.yml ps`
- `dockerDesktopLinuxEngine` not available
  - Start Docker Desktop and wait for engine ready
- CORS/auth request failures
  - Confirm `CORS_ORIGIN` and frontend API base URL match local ports
- Dependency lock mismatch
  - Run `bun install` and commit lockfile updates when required

## Production-oriented notes

- Never commit real credentials to the repository.
- Use secret managers or deployment platform environment settings.
- Use HTTPS in production and keep strict CORS/JWT settings enabled.
