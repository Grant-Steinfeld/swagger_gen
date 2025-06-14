import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};