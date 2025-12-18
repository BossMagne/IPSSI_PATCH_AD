import { createUser, findByEmail } from '../repositories/userRepository.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

export async function register(email: string, password: string) {
  const existing = await findByEmail(email);
  if (existing) throw new Error('EMAIL_ALREADY_USED');

  const passwordHash = await hashPassword(password);
  const user = await createUser(email, passwordHash);

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  return { user, accessToken, refreshToken };
}

export async function login(email: string, password: string) {
  const user = await findByEmail(email);
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) throw new Error('INVALID_CREDENTIALS');

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id });
  return { user, accessToken, refreshToken };
}
