import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const peopleRouter = Router();

peopleRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 200);

    let query = supabase
      .from('people')
      .select('*')
      .order('display_order', { ascending: true })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load people');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

peopleRouter.get('/principal-investigator', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', 'pi-1')
      .maybeSingle();

    ensureNoSupabaseError(error, 'Failed to load principal investigator');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
