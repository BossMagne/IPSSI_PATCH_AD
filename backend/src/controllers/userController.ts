import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export async function getMe(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const profile = await userService.getProfile(userId);
  return res.status(200).json(profile);
}
