import { NextFunction, Request, Response } from 'express';
import logger from './logger';

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const message = `Method ${req.method} on ${req.url}`;

  logger.info(message);

  next();
};
