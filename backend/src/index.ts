import express from "express";
import { env } from "./config/env.ts";
import { securityMiddleware } from "./config/security.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { prisma } from "./config/prisma.js"; // Prisma client

async function bootstrap() {
  // Vérifie la connexion Prisma
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");
  } catch (err) {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  }

  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.use(securityMiddleware.helmet);
  app.use(securityMiddleware.cors);
  app.use(securityMiddleware.rateLimit);

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`🚀 API listening on port ${env.port} (${env.nodeEnv})`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
