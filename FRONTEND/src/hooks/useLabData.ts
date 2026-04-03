import { useQuery } from '@tanstack/react-query';
import {
  fetchPeople,
  fetchPublications,
  fetchResearchAreas,
  fetchGrants,
  fetchEvents,
  fetchTimeline,
  fetchNews,
  fetchGallery,
} from '@/lib/api';
import type { Person } from '@/data/people';
import type { Publication } from '@/data/publications';
import type { ResearchArea } from '@/data/research';
import type { Grant } from '@/data/grants';
import type { LabEvent } from '@/data/events';
import type { NewsItem } from '@/data/news';
import type { GalleryImage } from '@/data/gallery';

export function usePeople(category?: string) {
  return useQuery<Person[], Error>({
    queryKey: ['people', category ?? 'all'],
    queryFn: () => fetchPeople(category),
  });
}

export function usePublications() {
  return useQuery<Publication[], Error>({
    queryKey: ['publications'],
    queryFn: fetchPublications,
  });
}

export function useResearchAreas() {
  return useQuery<ResearchArea[], Error>({
    queryKey: ['research'],
    queryFn: fetchResearchAreas,
  });
}

export function useGrants() {
  return useQuery<Grant[], Error>({
    queryKey: ['grants'],
    queryFn: fetchGrants,
  });
}

export function useEvents() {
  return useQuery<LabEvent[], Error>({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}

export function useTimeline() {
  return useQuery<LabEvent[], Error>({
    queryKey: ['timeline'],
    queryFn: fetchTimeline,
  });
}

export function useNews() {
  return useQuery<NewsItem[], Error>({
    queryKey: ['news'],
    queryFn: fetchNews,
  });
}

export function useGallery() {
  return useQuery<GalleryImage[], Error>({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  });
}
