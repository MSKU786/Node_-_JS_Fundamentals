import { Request, Response, NextFunction } from 'express';

enum Capacity {
  free = 10,
  standard = 100,
  premium = 1000,
}

async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('No token');

  const { userId, userRole } = await fetchRole(token);
  const limit = Capacity[userRole];
  const key = `rate:${userId}`;

  // Atomically increment and set expiry if new
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 60); // 60 seconds window
  }

  if (current > limit) {
    return res.status(429).send('Too many requests');
  }

  next();
}
