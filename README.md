# CodeLab

CodeLab is a full-stack coding-practice application. Users can browse programming
problems, run code against test cases, submit solutions, and track their progress.
It also includes accounts, admin-managed problems and sheets, and personal
problem playlists.

This repository contains a React/Vite frontend and an Express/Prisma backend.
PostgreSQL stores application data, and Judge0 runs submitted code. Judge0 can be
self-hosted with Docker or accessed through the RapidAPI listing described below.

## Features

- Sign-up, email verification, login, profile updates, and role-based access.
- Problem browsing, filtering, details, examples, and supported-language code
  snippets.
- Code execution against problem test cases with per-case output and status.
- Persistent submissions, submission history, and solved-problem tracking.
- User-created problem playlists.
- Admin-managed problems and structured coding sheets, including ordering and
  per-user progress.
- Optional Cloudinary profile-image storage.
- Responsive frontend with selectable themes.

## Technology

- **Frontend:** React, Vite, React Router, Tailwind CSS, daisyUI, Monaco Editor,
  Zustand, Zod.
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL.
- **Code execution:** Judge0 CE-compatible batch submissions.

## Repository layout

```text
backend/
  prisma/       Prisma schema and database migrations
  src/
    controllers/
    libs/       Database, Judge0, mail, and Cloudinary integrations
    middlewares/
    routes/
frontend/
  src/
    components/
    pages/
    store/
```

## Prerequisites

- Node.js and npm.
- A PostgreSQL database.
- A Judge0 CE-compatible service: self-hosted Judge0 or a RapidAPI subscription.
- SMTP credentials for account-verification emails (Mailtrap is configured by
  the example environment).
- Cloudinary credentials if profile-image uploads are to be used.

## Local development setup

Run commands from the repository root unless a command changes directory.

### 1. Install dependencies

```sh
cd backend
npm install
cd ../frontend
npm install
cd ..
```

### 2. Configure the backend

Copy `backend/.env.example` to `backend/.env` and fill in the values:

```env
PORT=8080
BASE_URL=http://localhost:8080
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/codelab?schema=public

MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASSWORD=

VERIFICATION_SECRET=replace-with-a-long-random-secret
VERIFICATION_EXPIRY=10m
ACCESSTOKEN_SECRET=replace-with-a-long-random-secret
ACCESSTOKEN_EXPIRY=15m
REFRESHTOKEN_SECRET=replace-with-a-long-random-secret
REFRESHTOKEN_EXPIRY=7d

JUDGE0_API_URL=http://localhost:2358
JUDGE0_RAPIDAPI_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Generate unique secret values for your environment. Keep `.env` files and API
keys private; do not commit them or place backend credentials in frontend
variables.

### 3. Configure the frontend

Copy `frontend/.env.example` to `frontend/.env` and set the backend origin:

```env
VITE_API_URL=http://localhost:8080
```

The frontend sends API requests to `${VITE_API_URL}/api/v1`.

### 4. Prepare the database

Ensure PostgreSQL is running and `DATABASE_URL` points to the database, then run:

```sh
cd backend
npx prisma generate
npx prisma migrate deploy
```

`migrate deploy` applies the migrations committed in `backend/prisma/migrations`.
Use `npx prisma migrate dev` when developing a schema change and creating a new
migration.

### 5. Start the app

In one terminal:

```sh
cd backend
npm run dev
```

In another terminal:

```sh
cd frontend
npm run dev
```

Open the Vite URL printed in the frontend terminal (normally
`http://localhost:5173`).

## Configure Judge0

Code execution and solution validation use Judge0's batch API. Both supported
setups use the same backend integration; choose one provider by setting
`JUDGE0_API_URL`. The backend sends requests to Judge0 and keeps any RapidAPI key
server-side.

### Option A: Self-host Judge0 with Docker

Judge0 is an open-source, sandboxed code-execution service. Follow the official
[Judge0 repository](https://github.com/judge0/judge0) and its
[deployment procedure](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure)
to install and run it with Docker. The required services and resource
requirements are described in Judge0's deployment documentation.

When the Judge0 API is reachable at `http://localhost:2358`, set:

```env
JUDGE0_API_URL=http://localhost:2358
JUDGE0_RAPIDAPI_KEY=
```

No RapidAPI key or RapidAPI headers are sent in this mode. If the CodeLab backend
runs inside a container, `localhost` refers to that backend container; use the
Judge0 service name or another address reachable from the backend instead.

### Option B: RapidAPI (free plan, if available)

The project can also use the
[Judge0 Extra CE listing on RapidAPI](https://rapidapi.com/skdeveloper/api/judge0-extra-ce1).
Check the listing for its current plans, limits, and availability: RapidAPI
controls those terms, and a free plan may not always be offered.

1. Sign in to RapidAPI and open the Judge0 Extra CE listing.
2. Subscribe to an available plan (choose the free plan if it is offered).
3. Copy your RapidAPI key from the account/dashboard.
4. Set these values in `backend/.env`:

   ```env
   JUDGE0_API_URL=https://judge0-extra-ce1.p.rapidapi.com
   JUDGE0_RAPIDAPI_KEY=your_rapidapi_key
   ```

When `JUDGE0_RAPIDAPI_KEY` is set, the backend adds `X-RapidAPI-Key` and
`X-RapidAPI-Host` to both batch creation and result-polling requests. The host is
derived from `JUDGE0_API_URL`. Leave the key out of the frontend and never
commit it.

If the provider displays a different API host in its current endpoint or
subscription documentation, use that host as `JUDGE0_API_URL`.

## Application flow

1. The React app calls the Express API at `VITE_API_URL` with credentials.
2. The backend authenticates requests and reads/writes data through Prisma and
   PostgreSQL.
3. For code execution, the backend sends one Judge0 batch containing the
   problem's test-case submissions.
4. It polls the batch tokens until Judge0 reports completed results.
5. The backend compares output with expected output and returns per-test-case
   results. On a solution submission, it also saves the submission and results;
   a fully accepted solution marks the problem as solved.

The language IDs currently configured for problem solutions are Java (62),
JavaScript (63), Python (71), and C (50). The language list in the selected
Judge0 service must support these IDs.

## Backend API overview

The API is mounted under `/api/v1`. Most endpoints require authentication;
problem and sheet administration endpoints additionally require an admin.

| Area | Base path | Purpose |
| --- | --- | --- |
| Authentication | `/auth` | Register, verify email, log in/out, retrieve and update profile |
| Problems | `/problems` | Browse, create, update, delete, and track solved problems |
| Code execution | `/execute-code` | Run test cases or submit a solution |
| Submissions | `/submission` | Retrieve submissions and per-problem submission counts |
| Playlists | `/playlist` | Create playlists and add/remove problems |
| Sheets | `/sheet` | Browse sheets, manage sheet problems, ordering, and progress |

See the route files in `backend/src/routes/` for endpoint paths and access
requirements.

## Useful commands

Run these from the relevant project directory.

**Backend (`backend/`):**

```sh
npm run dev       # Start Express with nodemon
npm start         # Start Express
npx prisma generate
npx prisma migrate deploy
```

**Frontend (`frontend/`):**

```sh
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Troubleshooting

- **Judge0 connection fails:** Confirm `JUDGE0_API_URL` is reachable from the
  backend process and that it points to the API origin, not a playground page.
- **RapidAPI returns an authorization or quota error:** Check the subscription
  status, key, plan limits, and API host in the RapidAPI listing.
- **Database connection fails:** Check PostgreSQL is running and that
  `DATABASE_URL` has the correct credentials, database name, and port.
- **Email verification is not received:** Check the SMTP settings and the
  provider's delivery/log view.
- **Frontend requests fail:** Confirm `VITE_API_URL`, `FRONTEND_URL`, and
  `BASE_URL` match the local origins being used.

## References

- [Judge0 source code and self-hosting](https://github.com/judge0/judge0)
- [Judge0 CE API documentation](https://ce.judge0.com)
- [Judge0 Extra CE on RapidAPI](https://rapidapi.com/skdeveloper/api/judge0-extra-ce1)
- [Create a batch submission playground](https://rapidapi.com/skdeveloper/api/judge0-extra-ce1/playground/Create%20a%20Batch%20Submission)