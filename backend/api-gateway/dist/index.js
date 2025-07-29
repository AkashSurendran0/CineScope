import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import cookieParser from 'cookie-parser';
import { rateLimitter } from './utils/rateLimitter.js';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(rateLimitter);
const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);
app.use(express.json());
const PORT = process.env.PORT || 5560;
try {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}
catch (error) {
    console.log('werer', error);
}
