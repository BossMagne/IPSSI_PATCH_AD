import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.js';

export const userRepository = AppDataSource.getRepository(User);

export async function findByEmail(email: string) {
  return userRepository.findOne({ where: { email } });
}

export async function createUser(email: string, passwordHash: string, role: 'user' | 'admin' = 'user') {
  const user = userRepository.create({ email, passwordHash, role });
  return userRepository.save(user);
}
