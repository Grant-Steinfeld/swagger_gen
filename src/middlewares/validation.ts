import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const getSchema = Joi.object({
  type: Joi.string().valid('dog', 'cat', 'fish'),
  breed: Joi.string(),
});

const petSchema = Joi.object({
  type: Joi.string().valid('dog', 'cat', 'fish').required(),
  breed: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().min(0).required(),
});

export function validateGet(req: Request, res: Response, next: NextFunction) {
  const { error } = getSchema.validate(req.query);
  if (error) return next(error); // Pass error to error handler
  next();
}

export function validateBody(req: Request, res: Response, next: NextFunction) {
  const { error } = petSchema.validate(req.body);
  if (error) return next(error); // Pass error to error handler
  next();
}
