# Docker Deployment on AWS ECS

This project is containerized for production deployment on ECS.

## Docker images

- Backend image source: `apps/backend/Dockerfile`
- Frontend image source: `apps/frontend/Dockerfile`

## Build commands

```bash
docker build -t synect-backend:latest apps/backend
docker build -t synect-frontend:latest apps/frontend
```

## ECR push flow (example)

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
docker tag synect-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/synect-backend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/synect-backend:latest
```

Repeat for frontend image.

## ECS runtime

- Configure task definitions with environment variables/secrets.
- Use ALB target groups for service routing.
- Health endpoint for backend: `GET /api/health`.
