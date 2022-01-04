import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import userDataAccess from '../../data-access/user.data-access';
import { DataStoredInToken } from '../../interfaces/dataInToken.interface';
import RequestWithUser from '../../interfaces/requestWithUser.interface';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      message: 'Unauthorized Error'
    });
  }

  const token = header.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      message: 'Forbidden Error'
    });
  }

  const verified = jwt.verify(token, JWT_SECRET) as DataStoredInToken;
  const user = await userDataAccess.getById(verified.id);

  if (user) {
    req.user = user;
    return next();
  }

  return res.status(403).json({
    message: 'Forbidden Error'
  });
};
