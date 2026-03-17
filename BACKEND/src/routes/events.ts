import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const eventsRouter = Router();

eventsRouter.get('/', async (req, res, next) => {
  try {
    const status = req.query.status as string | undefined;
    const type = req.query.type as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 200);

    let query = supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load events');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
