import {
  Router, Request, Response, NextFunction,
} from 'express';
import { body, validationResult } from 'express-validator';
import authService from '../services/auth-service';

const router = Router();

router.post(
  '/signup',
  body('username').isString(),
  body('email').isEmail().normalizeEmail().escape(),
  body('password').isLength({ min: 8 }),
  async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const {
      username,
      email,
      password,
    }: {
      username: string,
      email: string,
      password: string
    } = request.body;
    try {
      const user = await authService.registerUser(username, email, password);
      return response.send(user.serialize());
    } catch (error) {
      return next(error);
    }
  },
);

router.post(
  '/login',
  body('email').exists(),
  body('password').exists(),
  async (request: Request, response: Response, next: NextFunction) => {
    const { email, password }: { email: string, password: string } = request.body;
    try {
      const user = await authService.loginUser(email, password);
      return response.send(user.serialize());
    } catch (error) {
      return next(error);
    }
  },
);

export default router;
