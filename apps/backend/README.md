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

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)
- `GET /api/admin` (requires ADMIN role)

All POST/PATCH payloads are validated with Zod before reaching services.

Errors are handled centrally with a global error handler:

- Development: includes detailed stack/context for debugging
- Production: redacts sensitive internals and returns safe messages

## Core endpoints

- `GET /api/profiles/me`
- `PATCH /api/profiles/student`
- `PATCH /api/profiles/mentor`
- `GET /api/profiles/mentors`
- `POST /api/internships`
- `GET /api/internships`
- `GET /api/internships/:id`
- `PATCH /api/internships/:id`
- `DELETE /api/internships/:id`
- `POST /api/mentor-availability`
- `GET /api/mentor-availability/me`
- `GET /api/mentor-availability`
- `DELETE /api/mentor-availability/:id`
- `POST /api/bookings`
- `GET /api/bookings/student`
- `GET /api/bookings/mentor`
- `PATCH /api/bookings/:id/status`
- `PATCH /api/bookings/:id/cancel`

List endpoints support pagination using `?page=1&limit=10`.

## Database

```bash
bun run db:migrate:dev
bun run db:generate
bun run db:seed
```

Prisma is configured via `prisma.config.ts` at the backend app root.
