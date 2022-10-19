import { Request, Response } from 'express';
import { HttpError } from '../models/HttpError';

function handleError(
  err: TypeError | HttpError,
  req: Request,
  res: Response,
) {
  let httpError = err;

  if (!(err instanceof HttpError)) {
    httpError = new HttpError(
      'Oh no, this is embarrasing. We are having troubles my friend',
    );
  }

  res.status((httpError as HttpError).status).json(httpError);
}

export default handleError;
