# Synect Setup Guide

This guide gets Synect running locally with a realistic frontend-backend flow.

## Prerequisites

- Bun 1.2+
- Node.js 20+
- Docker Desktop (running)
- Git

## 1) Install dependencies

From repository root:

```bash
bun install
```

## 2) Configure backend

Copy env template:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Use local values in `apps/backend/.env`:

```env
DATABASE_URL="postgresql://synect_user:synect_password@localhost:5432/synect_db?schema=public"
PORT=3001
NODE_ENV="development"
FORCE_HTTPS="false"
CORS_ORIGIN="http://localhost:3000"
JWT_SECRET="replace-with-a-strong-secret"
JWT_EXPIRES_IN="15m"
JWT_ISSUER="synect-api"
JWT_AUDIENCE="synect-client"
REDIS_URL="redis://localhost:6379"
REDIS_TTL_SECONDS=120
```

Start local database/cache:

```bash
docker compose -f apps/backend/docker-compose.yml up -d
```

Apply migrations, generate Prisma client, and seed demo data:

```bash
bun run --cwd apps/backend db:migrate:dev -- --name init_local
bun run --cwd apps/backend db:generate
bun run --cwd apps/backend db:seed
```

Start backend:

```bash
bun run dev:backend
```

Backend URL: `http://localhost:3001`

## 3) Configure frontend

Copy frontend env template:

```bash
cp apps/frontend/.env.example apps/frontend/.env.local
```

Confirm `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

Start frontend:

```bash
bun run dev:frontend
```

Frontend URL: `http://localhost:3000`

## 4) Demo login accounts

After seed:

- Student: `student@synect.dev` / `Password123`
- Mentor: `mentor@synect.dev` / `Password123`
- Admin: `admin@synect.dev` / `Password123`

## 5) Quick validation flow

1. Open `http://localhost:3000/auth/login`
2. Login with seeded account
3. Verify redirect to `/dashboard`
4. Open `/internships` and create an internship
5. Confirm data loads from backend and persists after refresh

## 6) Quality checks

From repository root:

```bash
bun run lint
bun run test:frontend
bun run test
bun run test:e2e
bun run build
```

## 7) Common issues

- Docker engine not running
  - Start Docker Desktop and retry compose command
- DB auth errors (`P1000`)
  - Recheck `DATABASE_URL` and running containers
- CORS/auth errors
  - Ensure frontend runs on `3000`, backend on `3001`, and `CORS_ORIGIN` matches
