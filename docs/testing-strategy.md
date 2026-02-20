# Testing Strategy

## Unit testing

- Backend unit tests use Jest (`apps/backend/src/**/*.spec.ts`).
- Frontend unit tests use Jest + React Testing Library.
- Frontend examples:
  - `apps/frontend/app/components/ui/button.test.tsx`
  - `apps/frontend/lib/api-client.test.ts`

## Integration testing

- API integration tests run with Supertest in `apps/backend/test/*.e2e-spec.ts`.
- Auth flow and RBAC route behavior are covered:
  - signup
  - login
  - authenticated `me` route
  - admin route role restriction

## Commands

From repo root:

```bash
bun run test:frontend
bun run test
bun run test:e2e
```
