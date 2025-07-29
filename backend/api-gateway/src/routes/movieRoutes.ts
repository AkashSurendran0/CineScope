// routes/movieRoutes.ts
import express from 'express';
import { movieProxy } from '../utils/createProxy';

const router = express.Router();

router.use('/', movieProxy());

export default router;
