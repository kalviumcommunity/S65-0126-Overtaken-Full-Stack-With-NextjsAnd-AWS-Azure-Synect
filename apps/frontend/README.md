# Frontend Web App

Next.js frontend application for Synect.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript

## Run

Create local env file from example:

```bash
cp .env.example .env.local
```

Use this variable for backend API base URL:

```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

Only `NEXT_PUBLIC_*` variables are exposed to client-side code.

```bash
bun run dev
```

App runs at `http://localhost:3000` by default.

## Build and start

```bash
bun run build
bun run start
```

## Lint

```bash
bun run lint
```
