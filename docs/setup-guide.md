# Synect Setup Guide

This guide helps you run the full project locally (backend + frontend + database).

## 1) What you need first

- Bun 1.2+
- Node.js 20+
- Docker Desktop (must be running)
- Git

## 2) Clone and install

From project root:

```bash
bun install
```

## 3) Backend setup

Go to backend folder:

```bash
cd apps/backend
```

Create `.env` from `.env.example` and keep values like this for local Docker DB:

```env
DATABASE_URL="postgresql://synect_user:synect_password@localhost:5432/synect_db?schema=public"
PORT=3001
JWT_SECRET="replace-with-a-strong-secret"
JWT_EXPIRES_IN="1d"
```

Start PostgreSQL with Docker:

```bash
docker compose up -d
```

Run database migration and Prisma client generation:

```bash
bun run db:migrate:dev -- --name init_local
bun run db:generate
```

Start backend server:

```bash
bun run start:dev
```

Backend runs on `http://localhost:3001`.

## 4) Frontend setup

Open a new terminal and go to frontend:

```bash
cd apps/frontend
```

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Example value:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

Important:

- Only variables prefixed with `NEXT_PUBLIC_` are available in browser code.
- Keep secrets server-side only (do not expose secret keys with `NEXT_PUBLIC_`).

Run frontend:

```bash
bun run dev
```

Frontend runs on `http://localhost:3000`.

## 5) Root-level shortcuts

From repo root:

```bash
bun run dev:backend
bun run dev:frontend
bun run lint
bun run test
bun run build
```

## 6) Quick health check

After backend starts, verify:

```bash
curl http://localhost:3001/health
```

Expected response shape:

```json
{ "status": "ok", "database": "connected" }
```

## 7) Common issues

- `P1000 Authentication failed`:
  - Check `DATABASE_URL` username/password/db name
  - Confirm Docker container is up: `docker compose ps`
- `lockfile is frozen`:
  - Run `bun install`
  - Commit lockfile changes if any
- Port in use:
  - Change `PORT` in backend `.env` or stop conflicting process

## 8) Recommended daily workflow

1. Pull latest `main`
2. Create feature branch
3. Build your changes
4. Run lint/test/build
5. Open PR and merge after review
