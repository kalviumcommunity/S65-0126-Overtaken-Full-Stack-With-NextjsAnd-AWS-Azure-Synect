# System Architecture README

Synect is a full-stack platform for internship tracking and mentor booking, built as a Bun-based monorepo.

## Architecture at a glance

- Frontend: Next.js App Router (`apps/frontend`)
- Backend: NestJS API (`apps/backend`)
- Database: PostgreSQL with Prisma migrations
- Cache: Redis cache-aside for read-heavy endpoints
- Storage: AWS S3 for direct uploads via pre-signed URLs
- Email: AWS SES for transactional notifications
- CI: GitHub Actions (`.github/workflows/ci.yml`)
- Release automation: GitHub Actions + Amazon ECR/ECS (`.github/workflows/docker-release.yml`)

## Request flow

1. Browser calls frontend route.
2. Frontend calls backend API under `/api/*`.
3. Backend validates input, authenticates JWT, and enforces roles where required.
4. Service layer reads/writes PostgreSQL via Prisma and optionally Redis.
5. Response is returned in global envelope format.

## Authentication and authorization

- JWT-based access tokens.
- Access tokens include issuer and audience claims.
- Route protection is enforced through guards in backend.
- Frontend middleware protects authenticated pages.
- Role checks gate admin-only operations.

## Data and consistency model

- PostgreSQL is the source of truth.
- Redis is used for selective cache acceleration.
- Cache invalidation occurs on profile updates that affect mentor listing.
- Uploaded file metadata is persisted only after storage validation.

## Reliability and operations

- Health endpoint: `GET /api/health`
- Structured request and error logging enabled in backend.
- CI validates lint, build, frontend tests, backend unit tests, and backend e2e tests.
- Release workflow builds and pushes Docker images, verifies deployment health, and supports rollback.

## Key design decisions

- Monorepo keeps frontend/backend/docs changes aligned in one PR.
- Strict response envelope improves integration consistency.
- Environment-driven configuration enables safe cloud deployments.
- Security defaults include sanitization, CORS control, and HTTPS hardening.
