# Synect

**Synect** is a full-stack internship tracking and mentor booking platform built as a monorepo.
It provides a structured system for students to manage internship applications, track progress, and book mentor sessions, while mentors and admins manage availability and platform activity.

---

# 📦 Monorepo Structure

```
project-root/
├── apps/
│   ├── backend/        # NestJS API + Prisma
│   └── frontend/       # Next.js app
├── packages/           # Shared libraries (future use)
├── docs/               # Documentation
├── docker-compose.yml  # Container orchestration
├── .env.example        # Environment template
```

---

# 🚀 Quick Start (Recommended — Docker)

Run the entire stack with one command:

```bash
docker compose up --build
```

Access services:

| Service      | URL                   |
| ------------ | --------------------- |
| Backend API  | http://localhost:3000 |
| Frontend App | http://localhost:3001 |
| PostgreSQL   | localhost:5432        |

---

# 🛠 First Time Setup

```bash
cp .env.example .env
docker compose up --build
docker compose exec backend bun run db:migrate:dev
```

---

# 🔄 Daily Development

Start services:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

---

# 🧠 Tech Stack

### Backend

* NestJS
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Bun runtime

### Frontend

* Next.js 16
* Tailwind CSS
* TypeScript

### Infrastructure

* Docker
* Docker Compose
* Bun Monorepo

---

# 🐘 Database

### Run migrations

```bash
docker compose exec backend bun run db:migrate:dev
```

### Open DB shell

```bash
docker compose exec db psql -U synect_user -d synect_db
```

### Reset database

```bash
docker compose down -v
docker compose up --build
```

---

# 🔥 Hot Reload (Development)

Backend auto-reloads when editing:

```
apps/backend/src/
```

Frontend auto-reloads when editing:

```
apps/frontend/app/
```

No container restart needed.

---

# 📦 Installing Dependencies

If dependencies change:

```bash
docker compose up --build
```

---

# 📊 Useful Commands

| Command            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| Start all services | `docker compose up -d`                                    |
| Stop all services  | `docker compose down`                                     |
| Logs               | `docker compose logs -f`                                  |
| Backend shell      | `docker compose exec backend bun`                         |
| Frontend shell     | `docker compose exec frontend bun`                        |
| DB shell           | `docker compose exec db psql -U synect_user -d synect_db` |

---

# 🔐 Environment Variables

Copy template:

```
.env.example → .env
```

Important variables:

| Variable            | Purpose          |
| ------------------- | ---------------- |
| POSTGRES_USER       | DB username      |
| POSTGRES_PASSWORD   | DB password      |
| POSTGRES_DB         | Database name    |
| JWT_SECRET          | Auth secret      |
| BACKEND_PORT        | Backend port     |
| FRONTEND_PORT       | Frontend port    |
| NEXT_PUBLIC_API_URL | Frontend API URL |

Never commit `.env`.

---

# 🔗 Service Architecture

```
Frontend → Backend → Database
```

Service dependency chain:

```
frontend → backend → db
```

Containers communicate using service names, not localhost.

---

# 💾 Persistence

Database data is stored in a Docker named volume:

```
postgres_data
```

This means data persists even after containers stop.

To delete all data:

```bash
docker compose down -v
```

---

# 🧪 Quality Commands

Run lint:

```bash
bun run lint
```

Run tests:

```bash
bun run test
```

Build project:

```bash
bun run build
```

---

# 🤝 Team Workflow

### First Setup

```
clone repo
cp .env.example .env
docker compose up --build
docker compose exec backend bun run db:migrate:dev
```

### Daily Workflow

```
docker compose up -d
```

### Shutdown

```
docker compose down
```

---

# 📚 Documentation

Detailed Docker instructions:

```
docs/DOCKER.md
```

---

# 🧭 Project Goal

Deliver a secure, scalable MVP internship platform with:

* authentication
* role-based access
* internship tracking
* mentor booking
* cloud-ready deployment

---

# 🏁 Status

Active development 🚧
