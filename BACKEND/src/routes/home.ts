import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError } from '../utils/api.js';

export const homeRouter = Router();

homeRouter.get('/summary', async (_req, res, next) => {
  try {
    const [research, featuredPublications, upcomingEvents, latestNews] = await Promise.all([
      supabase.from('research_areas').select('*').order('display_order', { ascending: true }),
      supabase
        .from('publications')
        .select('*')
        .eq('featured', true)
        .order('year', { ascending: false })
        .order('display_order', { ascending: true })
        .limit(3),
      supabase
        .from('events')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('date', { ascending: true })
        .limit(3),
      supabase.from('news').select('*').order('date', { ascending: false }).limit(4),
    ]);

    ensureNoSupabaseError(research.error, 'Failed to load research areas');
    ensureNoSupabaseError(featuredPublications.error, 'Failed to load featured publications');
    ensureNoSupabaseError(upcomingEvents.error, 'Failed to load upcoming events');
    ensureNoSupabaseError(latestNews.error, 'Failed to load latest news');

    res.json({
      success: true,
      data: {
        researchAreas: research.data,
        featuredPublications: featuredPublications.data,
        upcomingEvents: upcomingEvents.data,
        latestNews: latestNews.data,
      },
    });
  } catch (error) {
    next(error);
  }
});
