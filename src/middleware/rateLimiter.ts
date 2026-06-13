import { Request, Response, NextFunction } from "express";

const rateLimitWindow = 15 * 60 * 1000; // 15 minutes
const rateLimitMax = 200; // max 200 requests per window
const ipCache = new Map<string, { count: number; resetTime: number }>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "test") {
    return next();
  }
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const clientData = ipCache.get(ip);

  if (!clientData || now > clientData.resetTime) {
    ipCache.set(ip, { count: 1, resetTime: now + rateLimitWindow });
    return next();
  }

  if (clientData.count >= rateLimitMax) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  clientData.count++;
  next();
}

// Memory leak protection: clean up expired IPs every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
const intervalId = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipCache.entries()) {
    if (now > data.resetTime) {
      ipCache.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

// Unref the timer to avoid blocking process termination (e.g. in tests)
if (typeof intervalId.unref === "function") {
  intervalId.unref();
}
