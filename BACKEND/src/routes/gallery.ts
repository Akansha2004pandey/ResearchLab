import { Router } from 'express';
import { supabase } from '../lib/supabase.js';
import { ensureNoSupabaseError, parseLimit } from '../utils/api.js';

export const galleryRouter = Router();

galleryRouter.get('/', async (req, res, next) => {
  try {
    const category = req.query.category as string | undefined;
    const limit = parseLimit(req.query.limit as string | undefined, 300);

    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('date', { ascending: false })
      .order('display_order', { ascending: true })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    ensureNoSupabaseError(error, 'Failed to load gallery images');

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
