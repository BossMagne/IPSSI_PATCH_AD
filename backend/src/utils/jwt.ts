import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signAccessToken(payload: object) {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiresIn });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.jwt.secret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwt.refreshSecret);
}
