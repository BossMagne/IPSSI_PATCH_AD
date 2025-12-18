import express from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: "Email already used" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, role: "user" },
  });

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "15m" });
  res.json({ user: { id: user.id, email: user.email }, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "15m" });
  res.json({ user: { id: user.id, email: user.email }, token });
});

export default router;
