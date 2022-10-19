import { comparePasswords, encryptPassword } from '../helpers/password';
import { createToken } from '../helpers/token';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

async function registerUser(username: string, email: string, password: string) : Promise<User> {
  const userRepository = new UserRepository();
  const hashedPassword = await encryptPassword(password);
  const user = await userRepository.create(
    username,
    email,
    hashedPassword,
  );
  const token = createToken(user.getId());
  user.setToken(token);
  return user;
}

async function loginUser(email: string, password: string) : Promise<User> {
  const userRepository = new UserRepository();
  const user = await userRepository.findUserByEmail(email);
  await comparePasswords(user.getPassword(), password);
  const token = createToken(user.getId());
  user.setToken(token);
  return user;
}

export default {
  registerUser,
  loginUser,
};
