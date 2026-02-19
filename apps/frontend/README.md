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

## Routing structure

- Public routes: `/`, `/auth/login`, `/auth/signup`
- Protected routes: `/dashboard`, `/profiles`, `/internships`, `/mentors`, `/availability`, `/bookings`, `/users/[id]`
- Dynamic route example: `/users/[id]`
- Route protection is handled via `middleware.ts` using JWT cookie presence checks.

## Layout and components

- Shared layout components are in `app/components/layout`:
  - `Header`
  - `Sidebar`
  - `LayoutWrapper`
- Reusable UI components are in `app/components/ui`:
  - `Button`
  - `Input`
- Barrel exports are available via `app/components/index.ts`.

## Data fetching and forms

- SWR is used for client-side data fetching with cache + revalidation.
- Example integration: `app/internships/page.tsx`.
- React Hook Form + Zod are used for schema-based form validation.
- Examples:
  - `app/auth/login/page.tsx`
  - `app/auth/signup/page.tsx`
  - `app/internships/page.tsx`
