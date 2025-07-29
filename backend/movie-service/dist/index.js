import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/', movieRoutes);
const PORT = process.env.PORT || 5562;
app.listen(PORT, () => {
    console.log(`🎬 Movie service running at port ${PORT}`);
});
