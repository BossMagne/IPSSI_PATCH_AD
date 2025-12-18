import { userRepository } from '../repositories/userRepository.js';

export async function getProfile(userId: string) {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error('USER_NOT_FOUND');
  return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt };
}
