# AI Lab Backend (Supabase + Admin CMS API)

Backend API for the AI Lab website. It provides:

- Public read endpoints for website showcase data
- Contact form submission endpoint
- Admin authentication and protected CRUD endpoints
- Admin image upload endpoint for block-based content editing

## Tech Stack

- Node.js + Express + TypeScript
- Supabase (Postgres + Storage)
- Zod validation
- JWT-based admin session auth
- bcrypt password hashing

## Setup

```bash
cd BACKEND
npm install
cp .env.example .env
```

Configure `BACKEND/.env`:

- `PORT` default: `4001`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CORS_ORIGIN` default: `http://localhost:8081`
- `JWT_SECRET` (strong random secret)
- `ADMIN_SIGNUP_KEY` (optional but recommended)

## Database Initialization

Run these SQL files in Supabase SQL Editor, in order:

1. `supabase/schema.sql`
2. `supabase/seed.sql`
3. `supabase/admin_auth.sql`

The third script creates `admin_users` used by admin login/signup.

## Run Locally

```bash
npm run dev
```

Default API base URL: `http://localhost:4001/api`

## Scripts

- `npm run dev` - run in watch mode
- `npm run build` - compile TypeScript
- `npm run typecheck` - type checking only
- `npm run start` - run compiled build

## Public Endpoints

- `GET /api/health`
- `GET /api/home/summary`
- `GET /api/people`
- `GET /api/people/principal-investigator`
- `GET /api/research`
- `GET /api/publications`
- `GET /api/grants`
- `GET /api/events`
- `GET /api/news`
- `GET /api/gallery`
- `POST /api/contact`

## Admin Endpoints

Authentication:

- `POST /api/admin/auth/signup`
- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`

Protected CMS:

- `GET /api/admin/:resource`
- `POST /api/admin/:resource`
- `PUT /api/admin/:resource/:id`
- `DELETE /api/admin/:resource/:id`
- `POST /api/admin/upload-image` (multipart form-data: `file`)

Supported resources:

- `people`
- `research_areas`
- `publications`
- `grants`
- `events`
- `news`
- `gallery_images`
- `contact_messages`

## Security Guidelines

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Set a strong `JWT_SECRET` in all environments.
- Use `ADMIN_SIGNUP_KEY` to restrict admin account creation.
- Rotate admin credentials and secrets periodically.
- Use HTTPS and secure environment variable management in production.

## Frontend Integration

Set frontend env:

```env
VITE_API_BASE_URL=http://localhost:4001/api
```

Then run frontend from `../FRONTEND`.
