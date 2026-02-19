# Frontend Developer Guide (Beginner Friendly)

Hi. This guide is written in very simple steps so you can work safely and confidently.

## 1) Big picture (very simple)

- Backend = data + business rules
- Frontend = screens + buttons + forms
- Frontend talks to backend through API endpoints

Your job in this project:

- Build pages and UI components in Next.js
- Call backend APIs
- Show data and handle loading/errors

## 2) One-time setup

From project root:

```bash
bun install
```

Start backend first (ask backend teammate for `.env` if needed):

```bash
cd apps/backend
docker compose up -d
bun run db:migrate:dev -- --name init_local
bun run start:dev
```

Now start frontend in another terminal:

```bash
cd apps/frontend
bun run dev
```

Open browser: `http://localhost:3000`

## 3) Where frontend files are

- App routes: `apps/frontend/app`
- Global styles: `apps/frontend/app/globals.css`
- Static assets: `apps/frontend/public`

Main files now:

- `apps/frontend/app/layout.tsx`
- `apps/frontend/app/page.tsx`

## 4) Branch workflow (important)

Always create a new branch for each task.

Example:

```bash
git checkout main
git pull
git checkout -b feature/frontend-login-page
```

After work:

```bash
bun run lint
bun run build
git add .
git commit -m "feat(frontend): add login page"
git push -u origin feature/frontend-login-page
```

Then open PR.

## 5) How to connect frontend to backend APIs

Backend base URL locally:

- `http://localhost:3001`

Start by using `fetch`.

Example login request:

```ts
const response = await fetch('http://localhost:3001/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'student@example.com',
    password: 'Password123',
  }),
});

const data = await response.json();
```

## 6) JWT token (very important)

When login is successful, backend returns `accessToken`.

You must send it in protected API requests:

```ts
headers: {
  Authorization: `Bearer ${token}`,
}
```

Protected endpoints fail without token.

## 7) Backend endpoints you will use first

Auth:

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`

Profiles:

- `GET /profiles/me`
- `PATCH /profiles/student`
- `PATCH /profiles/mentor`
- `GET /profiles/mentors`

Internships:

- `POST /internships`
- `GET /internships`
- `GET /internships/:id`
- `PATCH /internships/:id`
- `DELETE /internships/:id`

Mentor Availability:

- `POST /mentor-availability`
- `GET /mentor-availability/me`
- `GET /mentor-availability`
- `DELETE /mentor-availability/:id`

Bookings:

- `POST /bookings`
- `GET /bookings/student`
- `GET /bookings/mentor`
- `PATCH /bookings/:id/status`
- `PATCH /bookings/:id/cancel`

## 8) Suggested frontend task order

Do tasks in this order to avoid confusion:

1. Login/Signup pages
2. Save token and protected route check
3. Role-based dashboard shell (Student/Mentor/Admin)
4. Profile pages
5. Internship list + create form
6. Mentor list + availability list
7. Booking flow and booking status screens

## 9) Simple debugging checklist

If something fails:

1. Is backend running on port 3001?
2. Is frontend running on port 3000?
3. Is token present in request headers?
4. Check browser DevTools Network tab
5. Check backend terminal for exact error

## 10) Team rules to follow

- Do not push directly to `main`
- Keep PRs small and focused
- Run lint/build before push
- If API contract changes, inform backend teammate and update docs

You do not need to do everything perfectly on day one. Build one small feature at a time and test after each step.
