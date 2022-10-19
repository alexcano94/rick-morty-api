/* eslint-disable @typescript-eslint/no-throw-literal */
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token';
import { HttpError } from '../models/HttpError';

export default function handleError(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.split(' ')[1];
    try {
      const tokenData = verifyToken(token);
      req.body.tokenData = tokenData;
      next();
    } catch (error) {
      throw new HttpError('Wrong or expired token provided', 401);
    }
  } else {
    throw new HttpError('Bearer Token authentication is required', 401);
  }
}
