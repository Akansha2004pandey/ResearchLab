import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.js';
import { supabase } from '../lib/supabase.js';
import { ApiError } from '../middleware/error.js';
import { type AuthenticatedAdminRequest, requireAdminAuth } from '../middleware/adminAuth.js';
import { ensureNoSupabaseError } from '../utils/api.js';

const signupSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
  signupKey: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
});

export const adminAuthRouter = Router();

function signAdminToken(user: { id: string; email: string; name: string }) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, env.JWT_SECRET, {
    expiresIn: '12h',
  });
}

adminAuthRouter.post('/signup', async (req, res, next) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Invalid signup payload');
    }

    const { name, email, password, signupKey } = parsed.data;

    if (env.ADMIN_SIGNUP_KEY && signupKey !== env.ADMIN_SIGNUP_KEY) {
      throw new ApiError(403, 'Invalid admin signup key');
    }

    const { data: existing, error: existingError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    ensureNoSupabaseError(existingError, 'Failed to validate admin account');

    if (existing) {
      throw new ApiError(409, 'Admin account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        name,
        email,
        password_hash: passwordHash,
      })
      .select('id, name, email')
      .single();

    ensureNoSupabaseError(error, 'Failed to create admin account');
    if (!data) {
      throw new ApiError(500, 'Failed to create admin account');
    }

    const token = signAdminToken(data);

    res.status(201).json({ success: true, data: { token, user: data } });
  } catch (error) {
    next(error);
  }
});

adminAuthRouter.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, 'Invalid login payload');
    }

    const { email, password } = parsed.data;

    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, name, email, password_hash')
      .eq('email', email)
      .maybeSingle();

    ensureNoSupabaseError(error, 'Failed to load admin account');

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = signAdminToken(user);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

adminAuthRouter.get('/me', requireAdminAuth, async (req: AuthenticatedAdminRequest, res, next) => {
  try {
    const adminId = req.admin?.sub;
    if (!adminId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('id, name, email, created_at')
      .eq('id', adminId)
      .maybeSingle();

    ensureNoSupabaseError(error, 'Failed to load admin profile');

    if (!data) {
      throw new ApiError(401, 'Admin account not found');
    }

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
