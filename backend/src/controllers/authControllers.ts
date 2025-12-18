import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function postRegister(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const result = await authService.register(email, password);
  return res.status(201).json(result);
}

export async function postLogin(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const result = await authService.login(email, password);
  return res.status(200).json(result);
}
