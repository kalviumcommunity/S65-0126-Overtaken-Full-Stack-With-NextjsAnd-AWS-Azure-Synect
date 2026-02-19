# Backend API

NestJS backend service for Synect.

## Tech stack

- NestJS 11
- Prisma ORM
- PostgreSQL

## Environment

Create `.env` from `.env.example` and set at least:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

## Run

```bash
bun run start:dev
```

## Build and start

```bash
bun run build
bun run start:prod
```

## Test

```bash
bun run test
bun run test:e2e
```

## Auth endpoints

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me` (requires `Authorization: Bearer <token>`)

## Database

```bash
bun run db:migrate:dev
bun run db:generate
```

Prisma is configured via `prisma.config.ts` at the backend app root.
