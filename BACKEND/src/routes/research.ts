import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError } from '../utils/api.js';

export const researchRouter = Router();

researchRouter.get('/', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('research_areas')
      .select('*')
      .order('display_order', { ascending: true });

    ensureNoSupabaseError(error, 'Failed to load research areas');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
