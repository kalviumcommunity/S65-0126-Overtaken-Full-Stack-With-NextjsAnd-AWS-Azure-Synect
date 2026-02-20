# API and System Documentation

This guide centralizes Synect API contracts, authentication behavior, and integration artifacts for developers.

## API artifacts

- OpenAPI (Swagger-compatible): `docs/api/synect-openapi.yaml`
- Postman collection: `docs/postman/Synect.postman_collection.json`
- API conventions and response envelope: `docs/api-conventions.md`
- Architecture overview: `docs/architecture-readme.md`

## Base URLs

- Local backend: `http://localhost:3001`
- Base API path: `/api`

Example local endpoint: `http://localhost:3001/api/health`

## Authentication flow

1. Client signs up or logs in using `POST /api/auth/signup` or `POST /api/auth/login`.
2. Backend returns access token in API envelope data.
3. Client sends `Authorization: Bearer <token>` for protected routes.
4. Backend validates JWT signature, expiry, issuer, and audience.
5. Role-protected routes apply RBAC checks after authentication.

## Response contract

Success envelope:

```json
{
  "success": true,
  "message": "Request successful",
  "data": {},
  "timestamp": "2026-02-20T00:00:00.000Z"
}
```

Error envelope:

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": {
    "code": "BAD_REQUEST",
    "details": "Bad Request"
  },
  "path": "/api/internships",
  "timestamp": "2026-02-20T00:00:00.000Z"
}
```

## Core endpoint groups

- Health: `/api/health`
- Auth: `/api/auth/*`
- Profiles: `/api/profiles/*`
- Internships: `/api/internships/*`
- Mentor availability: `/api/mentor-availability/*`
- Bookings: `/api/bookings/*`
- Uploads: `/api/uploads/*`
- Admin and emails: `/api/admin`, `/api/emails/*`

## Pagination

List endpoints support:

- `page` (default `1`)
- `limit` (default `10`, max `100`)

Example: `GET /api/internships?page=1&limit=10`

## How to use docs during integration

- Start with Postman collection for end-to-end request flow.
- Use OpenAPI file for contract review and SDK generation.
- Cross-check security assumptions in `apps/backend/README.md` and architecture notes.
