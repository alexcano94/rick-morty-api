import { hash, compare } from 'bcrypt';
import { HttpError } from '../models/HttpError';
import config from '../../config';

const { SALT_ROUNDS } = config;

const encryptPassword = async (password: string) => hash(password, parseInt(SALT_ROUNDS, 10));

const comparePasswords = async (encrypted: string, plain: string) => {
  const passwordsEqual = await compare(plain, encrypted);
  if (!passwordsEqual) {
    throw new HttpError('Wrong password', 400);
  }
};

export {
  encryptPassword,
  comparePasswords,
};
