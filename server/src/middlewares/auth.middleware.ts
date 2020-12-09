import { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;
  if (!authHeader || authHeader?.split(' ').length === 1) {
    return response.status(401).json({ message: 'Token Inválido' });
  }
  return next();
}
