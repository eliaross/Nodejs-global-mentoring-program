import { NextFunction, Request, Response } from 'express';
import logger from './logger';

interface IError {
  method: string;
  code: number;
  params: any;
  error: string;
}

const handleError = (
  { error = 'Internal server error', code = 500, params = {}, method }: IError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errMessage = `Method - ${method} with params - ${
    Object.values(params).join(', ')
  } - has error: ${error}`;

  logger.error(errMessage);

  if (res.headersSent) {
    return next(error);
  }

  res.status(code).json({ error });
};

export default handleError;
