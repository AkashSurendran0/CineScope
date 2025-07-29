import { Router } from 'express';
import movieController from '../controllers/movieController.js';

const router = Router();

router.get('/searchMovie', movieController.fetchMovies);

export default router;
