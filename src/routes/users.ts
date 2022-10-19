import {
  Router, Request, Response, NextFunction,
} from 'express';
import { body as validationBody, validationResult } from 'express-validator';
import userService from '../services/user-service';

const router = Router();

router.patch(
  '/:id',
  validationBody('favs').isArray()
    .withMessage('favs must be an array'),
  async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { body } = request;
    const { id: userId } = request.params;
    try {
      const user = await userService.updateUser(userId, body.favs);
      response.send(user.serialize());
    } catch (error) {
      next(error);
    }
  },
);

export default router;
