# Synect API Conventions

## Base path

All backend routes are exposed under:

- `/api`

Example:

- `GET /api/health`
- `POST /api/auth/login`

## Route naming

- Use plural, noun-based resource names
- Keep route segments lowercase
- Use HTTP methods for action semantics

Examples:

- `GET /api/internships`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`

## Pagination

List routes support query-based pagination:

- `page` (default `1`)
- `limit` (default `10`, max `100`)

Example:

- `GET /api/internships?page=1&limit=10`

## Global response envelope

Successful responses:

```json
{
  "success": true,
  "message": "Request successful",
  "data": {},
  "timestamp": "2026-02-20T00:00:00.000Z"
}
```

Error responses:

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
