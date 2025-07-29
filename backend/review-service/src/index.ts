import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import reviewRouter from './routes/reviewRoutes';
import connectDb from './helpers/connectDB';

dotenv.config();
const app = express();

connectDb();

app.use(express.json());

app.use('/', reviewRouter);

const PORT = process.env.PORT || 5563;

app.listen(PORT, () => {
  console.log(`Review service running at ${PORT}`);
});