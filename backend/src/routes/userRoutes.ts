import express from "express";
import { prisma } from "../config/prisma.js";
import { authGuard } from "../middleware/authGuard.js";

const router = express.Router();

router.get("/", authGuard, async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
  });
  res.json(users);
});

export default router;
