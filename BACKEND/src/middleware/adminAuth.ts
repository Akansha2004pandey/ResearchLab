import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from './error.js';

export interface AdminJwtPayload {
  sub: string;
  email: string;
  name: string;
}

export interface AuthenticatedAdminRequest extends Request {
  admin?: AdminJwtPayload;
}

export function requireAdminAuth(req: AuthenticatedAdminRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing admin authorization token'));
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AdminJwtPayload;
    req.admin = payload;
    return next();
  } catch {
    return next(new ApiError(401, 'Invalid or expired admin token'));
  }
}
