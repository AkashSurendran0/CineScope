// routes/reviewRoutes.ts
import express from 'express';
import { reviewProxy } from '../utils/createProxy.js';
import { verifyToken } from '../utils/jwtChecker.js';

const router = express.Router();

router.use('/', verifyToken, reviewProxy());

export default router;
