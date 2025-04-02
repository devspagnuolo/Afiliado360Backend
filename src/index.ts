import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './types';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import hotmartRoutes from './routes/hotmart';
import favoriteRoutes from './routes/favorites';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Afiliado360 API rodando! 🚀');
});

app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/hotmart', hotmartRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
