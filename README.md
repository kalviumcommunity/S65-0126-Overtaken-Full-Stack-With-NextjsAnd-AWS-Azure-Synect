# Synect

Synect is a production-oriented full-stack platform for internship tracking, mentor discovery, and booking workflows.

## Repository structure

- `apps/backend` - NestJS API, Prisma, PostgreSQL, Redis integration
- `apps/frontend` - Next.js web app with App Router
- `docs` - engineering, API, architecture, deployment, and delivery documentation
- `.github/workflows` - CI and release automation workflows

## Prerequisites

- Bun 1.2+
- Node.js 20+
- Docker Desktop

## Quick start

```bash
bun install
bun run dev:backend
bun run dev:frontend
```

Backend: `http://localhost:3001`
Frontend: `http://localhost:3000`

## Quality gates

```bash
bun run lint
bun run build
bun run test:frontend
bun run test
bun run test:e2e
bun run test:ci
```

## Documentation index

### Getting started and contribution

- Setup guide: `docs/setup-guide.md`
- Contribution guide: `docs/contribution-guide.md`
- Team workflow: `docs/collaboration-workflow.md`
- Frontend developer guide: `docs/frontend-guide.md`

### API and architecture

- API and system documentation: `docs/api-system-documentation.md`
- API conventions: `docs/api-conventions.md`
- OpenAPI contract: `docs/api/synect-openapi.yaml`
- Postman collection: `docs/postman/Synect.postman_collection.json`
- Architecture overview: `docs/architecture-readme.md`

### Testing, deployment, and operations

- Testing strategy: `docs/testing-strategy.md`
- Cloud environment setup: `docs/cloud-environment-setup.md`
- ECS deployment guide: `docs/deployment-ecs.md`
- Domain and SSL setup: `docs/domain-and-ssl-setup.md`
- Logging and monitoring: `docs/logging-and-monitoring.md`
- Docker build and push automation: `docs/docker-build-push-automation.md`
- Deployment verification and rollback: `docs/deployment-verification-rollback.md`

### Wrap-up and delivery

- Debugging retrospective: `docs/debugging-retrospective.md`
- Final submission checklist: `docs/final-submission-checklist.md`

## CI/CD workflows

- Continuous integration: `.github/workflows/ci.yml`
- Docker release automation: `.github/workflows/docker-release.yml`

## Submission artifacts

- Live application URL: `<add-production-url>`
- Backend API URL: `<add-backend-url>`
- Video walkthrough URL: `<add-video-url>`
- Final delivery checklist: `docs/final-submission-checklist.md`

## Team

Team details and role ownership are documented in `docs/team-structure.md`.
