import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4001),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  CORS_ORIGIN: z.string().default('http://localhost:8081'),
  JWT_SECRET: z.string().min(16).default('change-me-to-a-long-random-secret'),
  ADMIN_SIGNUP_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
