import express from 'express';
import movieRoutes from './routes/movieRoutes.js'; 
import loadSecrets from './helpers/vault.js';

await loadSecrets()
const app = express();

app.use(express.json());

app.use('/', movieRoutes);

const PORT = process.env.PORT || 5562;

app.listen(PORT, () => {
  console.log(`🎬 Movie service running at port ${PORT}`);
});
