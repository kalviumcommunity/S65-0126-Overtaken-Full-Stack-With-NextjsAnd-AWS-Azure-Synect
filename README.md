# Synect

Monorepo for the Synect platform.

## Structure

- `apps/backend`: NestJS API + Prisma
- `apps/frontend`: Next.js web app
- `packages`: shared libraries (reserved for upcoming shared code)
- `docs`: project documentation

## Prerequisites

- Bun 1.2+
- Node.js 20+ (recommended for ecosystem tooling compatibility)

## Install

```bash
bun install
```

## Run apps

```bash
bun run dev:backend
bun run dev:frontend
```

## Quality and build

```bash
bun run lint
bun run test
bun run build
```

## Team workflow

- Branching and PR process: `docs/collaboration-workflow.md`
- Local setup guide: `docs/setup-guide.md`
- API conventions: `docs/api-conventions.md`
- Cloud environment setup: `docs/cloud-environment-setup.md`
- ECS deployment guide: `docs/deployment-ecs.md`
- Domain/SSL guide: `docs/domain-and-ssl-setup.md`
- Logging/monitoring guide: `docs/logging-and-monitoring.md`
