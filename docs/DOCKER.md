# Docker Setup Documentation

## Overview

This project uses Docker Compose to orchestrate a full-stack development environment with:
- **Backend**: NestJS API server running on port 3000
- **Frontend**: Next.js application running on port 3001  
- **Database**: PostgreSQL 15 with persistent volume

All services use **Bun** runtime and support hot reload for development.

---

## Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose v2.0+
- Port 3000, 3001, and 5432 available

### Setup

1. **Clone/Navigate to project root**
   ```bash
   cd /path/to/project
   ```

2. **Create .env file** (copy from .env.example)
   ```bash
   cp .env.example .env
   ```

3. **Start all services** (from project root)
   ```bash
   docker compose up --build
   ```

   Or run in background:
   ```bash
   docker compose up -d --build
   ```

4. **Wait for services to be healthy**
   - Backend: http://localhost:3000
   - Frontend: http://localhost:3001
   - PostgreSQL: localhost:5432

5. **Run database migrations** (in new terminal)
   ```bash
   docker compose exec backend bun run db:migrate:dev
   ```

---

## File Descriptions

### `docker-compose.yml` (Root)
**Purpose**: Orchestrates all services and their communication

**Services**:
- `db`: PostgreSQL 15 database
  - Persistent volume: `postgres_data`
  - Health checks enabled
  - Environment variables configurable via .env

- `backend`: NestJS API
  - Depends on `db` service being healthy
  - Hot reload via volume mount: `./apps/backend/src`
  - Runs development mode: `bun run start:dev`
  - Auto-generates Prisma client

- `frontend`: Next.js Application
  - Depends on `backend` service
  - Hot reload via volume mount: `./apps/frontend/app`
  - Runs development mode: `bun run dev`
  - API URL configured via `NEXT_PUBLIC_API_URL`

**Network**: All services on `app-network` bridge network for inter-service communication

**Logging**: JSON file driver with rotation (10MB max, 3 files)

---

### `apps/backend/Dockerfile`
**Purpose**: Multi-stage development Dockerfile for NestJS backend

**Stages**:
1. **Builder**: Installs dependencies using Bun
2. **Runtime**: Optimized final image with only necessary artifacts

**Features**:
- Non-root user (`appuser`) for security
- Prisma pre-installed globally
- Health check endpoint: `GET /health`
- Restart policy: `unless-stopped`
- Exposed port: 3000

**Environment Variables** (set by compose):
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing key
- `NODE_ENV`: development
- `PORT`: 3000

---

### `apps/frontend/Dockerfile`
**Purpose**: Multi-stage development Dockerfile for Next.js frontend

**Stages**:
1. **Builder**: Installs dependencies using Bun
2. **Runtime**: Optimized final image

**Features**:
- Non-root user (`appuser`) for security
- Hot reload enabled via volume mount
- Exposed port: 3000 (internally), 3001 (externally)
- Restart policy: `unless-stopped`

**Environment Variables** (set by compose):
- `NEXT_PUBLIC_API_URL`: Backend API endpoint for client-side requests
- `NODE_ENV`: development
- `PORT`: 3000

---

### `.env.example`
**Purpose**: Template for environment variables

**Required Configuration**:
```
# Database
POSTGRES_USER=synect_user
POSTGRES_PASSWORD=synect_password
POSTGRES_DB=synect_db
DB_PORT=5432

# Backend
BACKEND_PORT=3000
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key-change-in-production

# Frontend
FRONTEND_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**For Production**: 
- Change `JWT_SECRET` to strong random value
- Use secure database credentials
- Set `NODE_ENV=production`

---

### `.dockerignore` Files
**Purpose**: Optimize Docker build context by excluding unnecessary files

**Backend** (apps/backend/.dockerignore):
- Excludes: node_modules, dist, test, .git, etc.

**Frontend** (apps/frontend/.dockerignore):
- Excludes: node_modules, .next, .git, etc.

---

## Common Commands

### Development

**Start everything**:
```bash
docker compose up --build
```

**Start in background**:
```bash
docker compose up -d
```

**Stop all services**:
```bash
docker compose down
```

**Stop and remove volumes** (WARNING: deletes database):
```bash
docker compose down -v
```

**View logs**:
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

**Run database migrations**:
```bash
docker compose exec backend bun run db:migrate:dev
```

**Access database directly**:
```bash
docker compose exec db psql -U synect_user -d synect_db
```

**Rebuild after dependency changes**:
```bash
docker compose up --build
```

**Rebuild specific service**:
```bash
docker compose up -d --build backend
```

---

## Development Workflow

### Hot Reload

**Backend** (NestJS):
- Edit files in `apps/backend/src/`
- Changes automatically detected by `nest start --watch`
- No container restart needed

**Frontend** (Next.js):
- Edit files in `apps/frontend/app/`
- Changes automatically detected by `next dev`
- Hot Module Replacement (HMR) enabled by default

### Database Changes

**Create new migration**:
```bash
docker compose exec backend bun run db:migrate:dev
```

**Reset database** (deletes all data):
```bash
docker compose down -v
docker compose up -d
docker compose exec backend bun run db:migrate:dev
```

### Debugging

**Backend debugging** (attach debugger to port 9229):
```bash
# Modify docker-compose backend CMD to:
# ["bun", "run", "start:debug"]
```

**Container shell access**:
```bash
# Backend
docker compose exec backend bun

# Frontend
docker compose exec frontend bun

# Database
docker compose exec db bash
```

---

## Networking Details

### Service Discovery
- Services communicate via service names (not localhost)
- Backend in `docker-compose.yml`:
  - Exposed on `http://localhost:3000` (host machine)
  - Accessible as `http://backend:3000` (from other containers)

- PostgreSQL:
  - Exposed on `localhost:5432` (host machine)
  - Accessible as `postgres://db:5432` (from containers)

- Frontend:
  - Exposed on `http://localhost:3001` (host machine)
  - Can call backend at `http://backend:3000/api` (internal)

### Database URL Format
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

**In containers**: `postgresql://synect_user:synect_password@db:5432/synect_db`

---

## Troubleshooting

**Problem**: Port 3000 already in use
```bash
# Kill existing service or change port in .env
BACKEND_PORT=3002
```

**Problem**: Database connection refused
```bash
# Check db service is healthy
docker compose ps   # Look for db health status

# View db logs
docker compose logs db

# Restart db
docker compose restart db
```

**Problem**: Hot reload not working
```bash
# Ensure volumes are mounted correctly
docker compose exec backend ls -la /app/src

# Restart services
docker compose restart backend
```

**Problem**: Out of memory
```bash
# Increase Docker Desktop memory
# Docker Desktop → Preferences → Resources → Memory
```

**Problem**: Build fails with permission denied
```bash
# Reset Docker state
docker system prune -a

# Rebuild
docker compose up --build
```

---

## Production Considerations

1. **Use production images**: Build separate production Dockerfiles without dev dependencies
2. **Change secrets**: Generate new `JWT_SECRET` and database credentials
3. **Enable HTTPS**: Use reverse proxy (Nginx) in front of services
4. **Optimize images**: Use `--target runtime` in multi-stage builds
5. **Add monitoring**: Use Prometheus, ELK stack, or similar
6. **Use PostgreSQL managed service**: RDS, Azure Database, Supabase, etc.
7. **Configure backups**: Automated database backups
8. **Use environment-specific configs**: Separate .env files for dev/prod
9. **Set resource limits**: Add `cpu_shares` and `mem_limit` in compose file
10. **Use secrets management**: HashiCorp Vault, AWS Secrets Manager, etc.

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────┐
│                   Docker Host                        │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         app-network (bridge)                 │  │
│  │                                              │  │
│  │  ┌──────────────┐  ┌──────────────┐        │  │
│  │  │  frontend    │  │   backend    │        │  │
│  │  │ :3001        │  │   :3000      │        │  │
│  │  │ (Next.js)    │  │  (NestJS)    │        │  │
│  │  └──────┬───────┘  └──────┬───────┘        │  │
│  │         │                 │                │  │
│  │         │ calls            │                │  │
│  │         └─────────┬────────┘                │  │
│  │                   │                         │  │
│  │              ┌────▼────┐                   │  │
│  │              │    db   │                   │  │
│  │              │   :5432 │                   │  │
│  │              | (PG 15) │                   │  │
│  │              └─────────┘                   │  │
│  │                   │                         │  │
│  │             postgres_data                  │  │
│  │             (named volume)                 │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│ Exposed ports: 3000, 3001, 5432                    │
└─────────────────────────────────────────────────────┘
```

---

## Support

For issues or improvements to Docker setup:
1. Check Docker Desktop is running
2. Verify all files exist in correct locations
3. Check logs: `docker compose logs`
4. Ensure .env file exists
5. Test individual services in isolation
