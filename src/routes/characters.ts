import {
  Router, Request, Response, NextFunction,
} from 'express';
import characterService from '../services/character-service';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
  const page = request.query.page as string;
  const result = await characterService.getAllCharacters(page);
  response.json(result);
});

router.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
  const { id } = request.params;
  try {
    const character = await characterService.getCharacter(id);
    response.json(character);
  } catch (error) {
    next(error);
  }
});

export default router;
