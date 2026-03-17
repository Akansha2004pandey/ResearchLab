import { Router } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase.js';
import { ApiError } from '../middleware/error.js';
import { ensureNoSupabaseError } from '../utils/api.js';

const createContactMessageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10).max(2000),
});

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const parsed = createContactMessageSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ApiError(400, parsed.error.flatten().formErrors.join(', ') || 'Invalid contact payload');
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert(parsed.data)
      .select('*')
      .single();

    ensureNoSupabaseError(error, 'Failed to submit contact form');

    res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
});
