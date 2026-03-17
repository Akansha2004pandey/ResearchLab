import type { PostgrestError } from '@supabase/supabase-js';
import { ApiError } from '../middleware/error.js';

export function ensureNoSupabaseError(error: PostgrestError | null, fallbackMessage: string) {
  if (!error) return;
  throw new ApiError(500, `${fallbackMessage}: ${error.message}`);
}

export function parseLimit(input: string | undefined, defaultValue = 100) {
  if (!input) return defaultValue;
  const parsed = Number(input);
  if (Number.isNaN(parsed) || parsed <= 0) return defaultValue;
  return Math.min(parsed, 500);
}
