# AI Lab Frontend

Frontend application for the AI Lab website at NSUT. This project provides the public lab showcase and an admin portal UI for managing content blocks (people, research, publications, grants, events, news, and gallery).

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + shadcn/ui
- TanStack Query
- React Router

## Project Structure

- `src/pages`: Public pages and admin pages
- `src/components`: Reusable UI and layout components
- `src/lib/api.ts`: Public API client
- `src/lib/adminApi.ts`: Admin API client (auth + CRUD + image upload)
- `src/hooks/useLabData.ts`: Query hooks for public data

## Environment

Create `FRONTEND/.env` with:

```env
VITE_API_BASE_URL=http://localhost:4001/api
```

## Local Development

```bash
cd FRONTEND
npm install
npm run dev
```

Default local URL: `http://localhost:8081`

## Build and Quality Checks

```bash
npm run build
npm run lint
```

## Routing Overview

Public routes:

- `/`
- `/people`
- `/research`
- `/publications`
- `/funding`
- `/events`
- `/gallery`
- `/news`
- `/contact`

Admin routes:

- `/admin/login`
- `/admin/signup`
- `/admin`

## Admin UX Highlights

- Block-based editing (no manual JSON editing)
- Add, edit, and delete content blocks per section
- Image fields support file upload directly from the form
- Changes sync to Supabase via protected backend endpoints

## Backend Dependency

This frontend requires the backend API to be running at the configured `VITE_API_BASE_URL`. See `../BACKEND/README.md` for backend setup.

## Notes

- Keep admin JWT token secret and use HTTPS in production.
- Use a strong `ADMIN_SIGNUP_KEY` and rotate periodically.
