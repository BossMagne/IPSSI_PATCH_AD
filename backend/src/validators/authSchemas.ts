import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12) // intransigeant: longueur minimale
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12)
});
