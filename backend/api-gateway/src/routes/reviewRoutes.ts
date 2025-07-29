// routes/reviewRoutes.ts
import express from 'express';
import { reviewProxy } from '../utils/createProxy';
import { verifyToken } from '../utils/jwtChecker';

const router = express.Router();

router.use('/', verifyToken, reviewProxy());

export default router;
