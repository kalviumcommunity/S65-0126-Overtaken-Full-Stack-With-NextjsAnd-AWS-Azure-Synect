# Team Structure and Work Allocation

## Team Overview

- Team Name: Overtaken
- Team Leader: Gourish

## Team Members

- Gourish - Backend Development
- Chaitanya - Frontend Development
- Nikhil - DevOps, Testing and Documentation

## Role-Based Responsibilities

### Gourish (Team Leader, Backend Development)

- Own backend architecture and module design in NestJS
- Build and maintain authentication (JWT + bcrypt) and RBAC
- Design and implement API endpoints for internship tracking and mentor booking
- Manage Prisma schema updates and backend business logic
- Review backend PRs and ensure API quality and consistency

### Chaitanya (Frontend Development)

- Build UI in Next.js 16 with responsive and accessible components
- Implement role-based dashboards for Student, Mentor and Admin
- Integrate frontend with backend APIs and handle auth flows
- Build internship tracking and mentor booking screens
- Maintain frontend state, form handling and UX improvements

### Nikhil (DevOps, Testing and Documentation)

- Manage Docker-based local setup and environment consistency
- Set up and maintain CI checks for lint, test and build pipelines
- Drive backend/frontend testing support (unit, integration and e2e coordination)
- Track release readiness and deployment configuration baselines
- Own project documentation, onboarding docs and architecture updates

## Delivery Workflow

- Backend features by Gourish are exposed as documented APIs
- Frontend implementation by Chaitanya consumes those APIs feature-by-feature
- Nikhil validates quality gates (tests, lint, build), updates docs and supports releases
- Team Leader (Gourish) coordinates sprint priorities and final technical decisions

## Current Work Split (MVP)

- Backend (Gourish): Auth, Profiles, Internship APIs, Mentor Booking APIs
- Frontend (Chaitanya): Auth UI, Role Dashboards, Internship and Booking UI flows
- DevOps/QA/Docs (Nikhil): Docker setup, test strategy, CI baseline, project docs
