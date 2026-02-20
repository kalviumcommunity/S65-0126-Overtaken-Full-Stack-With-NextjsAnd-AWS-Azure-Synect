# Team Branching and PR Workflow

This guide defines how the Synect team collaborates using GitHub.

## Branch naming conventions

Create a dedicated branch per task using one of these prefixes:

- `feat/<short-name>` for new features
- `fix/<short-name>` for bug fixes
- `chore/<short-name>` for maintenance/tooling/config tasks
- `docs/<short-name>` for documentation-only updates

Examples:

- `feat/internship-crud`
- `fix/booking-slot-conflict`
- `chore/eslint-prettier-update`
- `docs/setup-guide-update`

## Pull Request rules

- No direct push to `main`
- Every change goes through Pull Request review
- Keep PRs small and focused (single objective)
- Use `.github/pull_request_template.md` for consistent PR quality

## Code review checklist

Before approving a PR, verify:

- Scope is clear and contains no unrelated file changes
- Lint/build/tests are passing
- API and DB changes are documented clearly
- Security checks are done (no secrets, safe auth handling)
- Docs are updated when behavior/setup changes

## Required branch protection on `main`

Apply these GitHub settings for `main`:

1. Require a pull request before merging
2. Require at least 1 approval
3. Require conversation resolution before merge
4. Require status checks to pass before merge
5. Restrict direct pushes to `main`

Recommended required checks:

- `lint`
- `build`
- `test`

## Suggested daily flow

1. `git checkout main`
2. `git pull`
3. `git checkout -b <type>/<short-name>`
4. Implement and commit changes
5. Run validation locally
6. Push branch and open PR
7. Address review comments
8. Merge after checks + approval
