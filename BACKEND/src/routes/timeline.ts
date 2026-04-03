import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const timelineRouter = Router();

timelineRouter.get('/', async (req, res, next) => {
  try {
    const type = req.query.type as string | undefined;
    const year = req.query.year as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 300);

    let query = supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    if (year) {
      query = query.gte('date', `${year}-01-01`).lte('date', `${year}-12-31`);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load lab timeline events');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
