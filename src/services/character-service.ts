/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable import/extensions */
import { getCharacters, getCharacter as getCharacterDetails } from 'rickmortyapi';
import { HttpError } from '../models/HttpError';

const getAllCharacters = async (page: string) => {
  const filter = { page: page ? parseInt(page) : 1 };
  const { data } = await getCharacters(filter);
  return data;
};

const getCharacter = async (characterId : string) => {
  const { data: character } = await getCharacterDetails(parseInt(characterId));
  if (Object.keys(character).length === 0) throw new HttpError(`Character with id ${characterId} not found`, 404);
  else return character;
};

export default {
  getAllCharacters,
  getCharacter,
};
