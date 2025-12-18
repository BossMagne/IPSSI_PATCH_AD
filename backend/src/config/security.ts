import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const securityMiddleware = {
  cors: cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }),
  helmet: helmet(),
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
};

