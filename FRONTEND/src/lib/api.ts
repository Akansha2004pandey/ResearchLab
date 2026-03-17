import type { Person } from '@/data/people';
import type { Publication } from '@/data/publications';
import type { ResearchArea } from '@/data/research';
import type { Grant } from '@/data/grants';
import type { LabEvent } from '@/data/events';
import type { NewsItem } from '@/data/news';
import type { GalleryImage } from '@/data/gallery';

const BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://localhost:4000/api';

// ── Core fetch wrapper ────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  const json = (await res.json()) as { success: boolean; data: T; message?: string };
  if (!res.ok) throw new Error(json.message ?? `API error ${res.status}`);
  return json.data;
}

// ── Mappers (DB snake_case → frontend camelCase) ──────────────────────────────

type Row = Record<string, unknown>;

function mapPerson(r: Row): Person {
  return {
    id: r.id as string,
    name: r.name as string,
    role: r.role as string,
    category: r.category as Person['category'],
    image: (r.image as string) || '/placeholder.svg',
    bio: r.bio as string,
    researchInterests: (r.research_interests as string[]) ?? [],
    email: r.email as string | undefined,
    googleScholar: r.google_scholar as string | undefined,
    linkedin: r.linkedin as string | undefined,
    website: r.website as string | undefined,
    yearJoined: r.year_joined as number | undefined,
    yearLeft: r.year_left as number | undefined,
  };
}

function mapPublication(r: Row): Publication {
  return {
    id: r.id as string,
    title: r.title as string,
    authors: (r.authors as string[]) ?? [],
    venue: r.venue as string,
    year: r.year as number,
    type: r.type as Publication['type'],
    abstract: r.abstract as string | undefined,
    pdfUrl: r.pdf_url as string | undefined,
    doiUrl: r.doi_url as string | undefined,
    codeUrl: r.code_url as string | undefined,
    bibtex: r.bibtex as string | undefined,
    featured: (r.featured as boolean) ?? false,
  };
}

function mapResearchArea(r: Row): ResearchArea {
  return {
    id: r.id as string,
    title: r.title as string,
    shortDescription: r.short_description as string,
    fullDescription: r.full_description as string,
    methodology: r.methodology as string,
    contributions: (r.contributions as string[]) ?? [],
    relatedPublications: (r.related_publications as string[]) ?? [],
    icon: r.icon as string,
    image: r.image as string,
  };
}

function mapGrant(r: Row): Grant {
  return {
    id: r.id as string,
    title: r.title as string,
    agency: r.agency as string,
    agencyLogo: r.agency_logo as string | undefined,
    amount: r.amount as string | undefined,
    startDate: r.start_date as string,
    endDate: r.end_date as string,
    pi: r.pi as string,
    coPIs: r.co_pis as string[] | undefined,
    description: r.description as string,
    status: r.status as Grant['status'],
  };
}

function mapEvent(r: Row): LabEvent {
  return {
    id: r.id as string,
    title: r.title as string,
    type: r.type as LabEvent['type'],
    date: r.date as string,
    endDate: r.end_date as string | undefined,
    time: r.time as string | undefined,
    venue: r.venue as string,
    description: r.description as string,
    fullDescription: r.full_description as string | undefined,
    speaker: r.speaker as string | undefined,
    speakerAffiliation: r.speaker_affiliation as string | undefined,
    posterImage: r.poster_image as string | undefined,
    registrationUrl: r.registration_url as string | undefined,
    status: r.status as LabEvent['status'],
  };
}

function mapNewsItem(r: Row): NewsItem {
  return {
    id: r.id as string,
    title: r.title as string,
    date: r.date as string,
    category: r.category as NewsItem['category'],
    description: r.description as string,
    image: r.image as string | undefined,
    link: r.link as string | undefined,
  };
}

function mapGalleryImage(r: Row): GalleryImage {
  return {
    id: r.id as string,
    src: r.src as string,
    alt: r.alt as string,
    caption: r.caption as string,
    category: r.category as GalleryImage['category'],
    date: r.date as string,
  };
}

// ── Public API functions ──────────────────────────────────────────────────────

export async function fetchPeople(category?: string): Promise<Person[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : '';
  const rows = await apiFetch<Row[]>(`/people${qs}`);
  return rows.map(mapPerson);
}

export async function fetchPublications(): Promise<Publication[]> {
  const rows = await apiFetch<Row[]>('/publications');
  return rows.map(mapPublication);
}

export async function fetchResearchAreas(): Promise<ResearchArea[]> {
  const rows = await apiFetch<Row[]>('/research');
  return rows.map(mapResearchArea);
}

export async function fetchGrants(): Promise<Grant[]> {
  const rows = await apiFetch<Row[]>('/grants');
  return rows.map(mapGrant);
}

export async function fetchEvents(): Promise<LabEvent[]> {
  const rows = await apiFetch<Row[]>('/events');
  return rows.map(mapEvent);
}

export async function fetchNews(): Promise<NewsItem[]> {
  const rows = await apiFetch<Row[]>('/news');
  return rows.map(mapNewsItem);
}

export async function fetchGallery(): Promise<GalleryImage[]> {
  const rows = await apiFetch<Row[]>('/gallery');
  return rows.map(mapGalleryImage);
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await apiFetch<unknown>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
