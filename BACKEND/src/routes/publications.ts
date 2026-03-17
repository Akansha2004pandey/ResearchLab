import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const publicationsRouter = Router();

publicationsRouter.get('/', async (req, res, next) => {
  try {
    const type = req.query.type as string | undefined;
    const featured = req.query.featured as string | undefined;
    const search = req.query.search as string | undefined;
    const year = req.query.year as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 300);

    let query = supabase
      .from('publications')
      .select('*')
      .order('year', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (year) {
      const yearNum = Number(year);
      if (!Number.isNaN(yearNum)) {
        query = query.eq('year', yearNum);
      }
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load publications');

    let filteredData = data ?? [];

    if (search) {
      const queryText = search.toLowerCase();
      filteredData = filteredData.filter((publication) => {
        const titleMatch = publication.title.toLowerCase().includes(queryText);
        const venueMatch = publication.venue.toLowerCase().includes(queryText);
        const authorMatch = publication.authors.some((author: string) =>
          author.toLowerCase().includes(queryText),
        );

        return titleMatch || venueMatch || authorMatch;
      });
    }

    res.json({ success: true, data: filteredData });
  } catch (error) {
    next(error);
  }
});
