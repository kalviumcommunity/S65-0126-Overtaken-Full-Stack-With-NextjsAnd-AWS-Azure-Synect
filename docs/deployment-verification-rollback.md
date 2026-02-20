# Deployment Verification and Rollback (2.48)

Deployment safety is implemented in the Docker release workflow.

## Verification step

After image push, the workflow checks backend health endpoint with retries:

- target endpoint from `BACKEND_HEALTHCHECK_URL` secret
- 5 attempts with wait between retries
- expected healthy response: successful HTTP response from `/api/health`

## Rollback strategy

If health verification fails:

- workflow triggers ECS rollback command automatically
- service is updated to last stable task definition using:
  - `ECS_CLUSTER_NAME`
  - `ECS_SERVICE_NAME`
  - `ECS_ROLLBACK_TASK_DEF_ARN`

## Required GitHub secrets

- `BACKEND_HEALTHCHECK_URL`
- `ECS_CLUSTER_NAME`
- `ECS_SERVICE_NAME`
- `ECS_ROLLBACK_TASK_DEF_ARN`

## Operational practice

- After each stable release, update `ECS_ROLLBACK_TASK_DEF_ARN` to that stable revision.
- Keep release notes with task definition ARN for quick incident response.
