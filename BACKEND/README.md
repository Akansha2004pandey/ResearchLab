# ResearchLab Backend (Supabase)

This backend mirrors the current frontend data model and provides a production-style API layer over Supabase.

## Stack

- Node.js + Express + TypeScript
- Supabase Postgres
- Supabase JS client (`service_role` key)
- Zod validation for inputs

## 1. Setup

```bash
cd BACKEND
npm install
cp .env.example .env
```

Update `.env`:

- `SUPABASE_URL`: your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: service role key from Supabase project settings
- `CORS_ORIGIN`: frontend URL, default `http://localhost:8081`
- `JWT_SECRET`: random 32+ character secret for admin session tokens
- `ADMIN_SIGNUP_KEY`: optional key required during admin signup

## 2. Create DB schema + seed

In Supabase SQL editor, run:

1. `supabase/schema.sql`
2. `supabase/seed.sql`
3. `supabase/admin_auth.sql` (required for admin login/signup)

## 3. Run API

```bash
npm run dev
```

Server default: `http://localhost:4001`

## API Endpoints

- `GET /api/health`
- `GET /api/home/summary`
- `GET /api/people?category=faculty|phd|masters|undergrad|staff|alumni`
- `GET /api/people/principal-investigator`
- `GET /api/research`
- `GET /api/publications?type=journal|conference|workshop|preprint|patent&featured=true&year=2024&search=deep`
- `GET /api/grants?status=ongoing|completed`
- `GET /api/events?status=upcoming|ongoing|past&type=seminar|workshop|conference|hackathon|webinar|outreach`
- `GET /api/news?category=paper|grant|award|media|general`
- `GET /api/gallery?category=conference|workshop|lab|outreach`
- `POST /api/contact`

### Admin Auth + CMS Endpoints

- `POST /api/admin/auth/signup`
- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `GET /api/admin/:resource`
- `POST /api/admin/:resource`
- `PUT /api/admin/:resource/:id`
- `DELETE /api/admin/:resource/:id`

Supported `:resource` values: `people`, `research_areas`, `publications`, `grants`, `events`, `news`, `gallery_images`, `contact_messages`.

`POST /api/contact` body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration",
  "message": "I would like to discuss a potential collaboration..."
}
```

## Frontend integration notes

Replace imports from `src/data/*.ts` with API calls to this backend. Existing frontend filtering logic can stay client-side or move to query params above.

Minimal Vite env for frontend:

```env
VITE_API_BASE_URL=http://localhost:4001/api
```

## Security notes

- Backend uses `service_role` key; do not expose this key in frontend.
- Keep `contact_messages` write-only from client perspective (only backend should fetch admin-side).
