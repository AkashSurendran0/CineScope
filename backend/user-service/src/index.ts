import express from 'express';
import loadSecrets from './helpers/vault.js';

await loadSecrets();

import { connectDb, getSequelize } from './helpers/connectDb.js';
await connectDb();

import { initUserModel } from './models/userModel.js';
initUserModel();

const sequelize = getSequelize();
await sequelize.sync({ alter: true });

const app = express();
app.use(express.json());

const userRoutes = (await import('./routes/userRoutes.js')).default;
app.use('/', userRoutes);

const PORT = process.env.PORT || 5561;
app.listen(PORT, () => console.log(`✅ user-service running at ${PORT}`));
