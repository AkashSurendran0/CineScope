import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { connectDb, sequelize } from './helpers/connectDb.js';
dotenv.config();
const app = express();
connectDb();
sequelize.sync({ alter: true }) // Creates table if not exists
    .then(() => console.log("✅ Tables synced"))
    .catch((err) => console.log("❌ Sync error:", err));
app.use(express.json());
app.use('/', userRoutes);
const PORT = process.env.PORT || 5561;
app.listen(PORT, () => {
    console.log(`user-service running at ${PORT}`);
});
