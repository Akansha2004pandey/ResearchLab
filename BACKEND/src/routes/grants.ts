import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const grantsRouter = Router();

grantsRouter.get('/', async (req, res, next) => {
  try {
    const status = req.query.status as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 200);

    let query = supabase
      .from('grants')
      .select('*')
      .order('display_order', { ascending: true })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load grants');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
