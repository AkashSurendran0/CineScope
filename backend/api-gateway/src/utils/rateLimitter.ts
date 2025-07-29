import { rateLimit } from 'express-rate-limit';
import { Request, Response } from 'express';

export const rateLimitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.json({ success: false, message: 'Too many requests, please try again later' });
  },
});
