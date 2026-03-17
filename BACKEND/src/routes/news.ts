import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const newsRouter = Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 200);

    let query = supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load news');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
