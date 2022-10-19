import UserRepository from '../repositories/UserRepository';

const updateUser = async (userId: string, favs: number[]) => {
  const userRepository = new UserRepository();
  return userRepository.update(userId, favs);
};

export default {
  updateUser,
};
