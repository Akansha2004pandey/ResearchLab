create extension if not exists pgcrypto;

create table if not exists people (
  id text primary key,
  name text not null,
  role text not null,
  category text not null check (category in ('faculty', 'phd', 'masters', 'undergrad', 'staff', 'alumni')),
  image text not null,
  bio text not null,
  research_interests text[] not null default '{}',
  email text,
  google_scholar text,
  linkedin text,
  website text,
  github text,
  twitter text,
  year_joined int,
  year_left int,
  image_class_name text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table people add column if not exists github text;
alter table people add column if not exists twitter text;

create table if not exists research_areas (
  id text primary key,
  title text not null,
  short_description text not null,
  full_description text not null,
  methodology text not null,
  contributions text[] not null default '{}',
  related_publication_ids text[] not null default '{}',
  icon text not null,
  image text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists publications (
  id text primary key,
  title text not null,
  authors text[] not null default '{}',
  venue text not null,
  year int not null,
  type text not null check (type in ('journal', 'conference', 'workshop', 'preprint', 'patent')),
  abstract text,
  pdf_url text,
  doi_url text,
  code_url text,
  bibtex text,
  featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists grants (
  id text primary key,
  title text not null,
  agency text not null,
  agency_logo text,
  amount text,
  start_date text not null,
  end_date text not null,
  pi text not null,
  co_pis text[] not null default '{}',
  description text not null,
  status text not null check (status in ('ongoing', 'completed')),
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id text primary key,
  title text not null,
  type text not null check (type in ('seminar', 'workshop', 'conference', 'hackathon', 'webinar', 'outreach')),
  date date not null,
  end_date date,
  time text,
  venue text not null,
  description text not null,
  full_description text,
  speaker text,
  speaker_affiliation text,
  poster_image text,
  images text[] not null default '{}',
  registration_url text,
  status text not null check (status in ('upcoming', 'ongoing', 'past')),
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table events add column if not exists images text[] not null default '{}';

create table if not exists news (
  id text primary key,
  title text not null,
  date date not null,
  category text not null check (category in ('paper', 'grant', 'award', 'media', 'general')),
  description text not null,
  image text,
  link text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_images (
  id text primary key,
  src text not null,
  alt text not null,
  caption text not null,
  category text not null check (category in ('conference', 'workshop', 'lab', 'outreach')),
  date text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table people enable row level security;
alter table research_areas enable row level security;
alter table publications enable row level security;
alter table grants enable row level security;
alter table events enable row level security;
alter table news enable row level security;
alter table gallery_images enable row level security;
alter table contact_messages enable row level security;
alter table admin_users enable row level security;

drop policy if exists "Public read people" on people;
create policy "Public read people" on people for select using (true);

drop policy if exists "Public read research areas" on research_areas;
create policy "Public read research areas" on research_areas for select using (true);

drop policy if exists "Public read publications" on publications;
create policy "Public read publications" on publications for select using (true);

drop policy if exists "Public read grants" on grants;
create policy "Public read grants" on grants for select using (true);

drop policy if exists "Public read events" on events;
create policy "Public read events" on events for select using (true);

drop policy if exists "Public read news" on news;
create policy "Public read news" on news for select using (true);

drop policy if exists "Public read gallery images" on gallery_images;
create policy "Public read gallery images" on gallery_images for select using (true);

drop policy if exists "Public insert contact messages" on contact_messages;
create policy "Public insert contact messages" on contact_messages for insert with check (true);
