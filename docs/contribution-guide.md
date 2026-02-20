# Contribution Guide

This document defines how to contribute safely and consistently to Synect.

## Branch strategy

- Base branch: `main`
- Branch prefixes:
  - `feat/<short-name>`
  - `fix/<short-name>`
  - `chore/<short-name>`
  - `docs/<short-name>`

Examples:

- `feat/docker-release-automation`
- `fix/auth-token-expiry-bug`
- `docs/final-submission-update`

## Commit quality

- Keep commits focused and atomic.
- Prefer Conventional Commit style (`feat:`, `fix:`, `docs:`, `chore:`).
- Avoid mixing refactors, feature work, and formatting-only changes in one commit.

## Pull request workflow

1. Sync `main` and create a fresh branch.
2. Implement one objective per PR.
3. Run local quality checks.
4. Open PR using `.github/pull_request_template.md`.
5. Address review feedback and keep discussion resolved before merge.

## Required checks before opening PR

From repository root:

```bash
bun run lint
bun run build
bun run test:frontend
bun run test
bun run test:e2e
```

## Documentation expectations

- Update docs when setup, API contracts, architecture, deployment, or workflows change.
- Keep endpoint examples aligned with current response envelope.
- Link new docs from root `README.md`.

## Security and secret hygiene

- Never commit `.env` files, cloud credentials, or private keys.
- Keep `.env.example` files as placeholders only.
- Review auth and role checks for protected endpoints.

## Merge policy

- No direct pushes to `main`.
- Require at least one review approval.
- Require CI checks to pass before merge.
