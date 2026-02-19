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

For local PostgreSQL via Docker:

```bash
docker compose up -d
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

## Core endpoints

- `GET /profiles/me`
- `PATCH /profiles/student`
- `PATCH /profiles/mentor`
- `GET /profiles/mentors`
- `POST /internships`
- `GET /internships`
- `GET /internships/:id`
- `PATCH /internships/:id`
- `DELETE /internships/:id`
- `POST /mentor-availability`
- `GET /mentor-availability/me`
- `GET /mentor-availability`
- `DELETE /mentor-availability/:id`
- `POST /bookings`
- `GET /bookings/student`
- `GET /bookings/mentor`
- `PATCH /bookings/:id/status`
- `PATCH /bookings/:id/cancel`

## Database

```bash
bun run db:migrate:dev
bun run db:generate
bun run db:seed
```

Prisma is configured via `prisma.config.ts` at the backend app root.
