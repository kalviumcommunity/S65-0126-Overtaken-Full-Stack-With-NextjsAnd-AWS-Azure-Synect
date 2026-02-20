# Docker Build and Push Automation

Docker build/push automation is configured in:

- `.github/workflows/docker-release.yml`

## What the workflow does

1. Authenticates to AWS using OIDC (`aws-actions/configure-aws-credentials`)
2. Logs in to Amazon ECR
3. Builds and pushes backend image from `apps/backend/Dockerfile`
4. Builds and pushes frontend image from `apps/frontend/Dockerfile`
5. Tags images with both `latest` and commit SHA short tag

## Required GitHub secrets

- `AWS_ROLE_ARN`
- `AWS_REGION`
- `ECR_REPOSITORY_BACKEND`
- `ECR_REPOSITORY_FRONTEND`

## Trigger

- On push to `main`
- Manual run via `workflow_dispatch`
