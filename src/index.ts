import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/products'; // ✅ nova rota de produtos

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 🟢 Status básico da API
app.get('/', (_req, res) => {
  res.send('Afiliado360 API rodando! 🚀');
});

// 🔐 Rotas de autenticação
app.use('/api', authRoutes);

// 📦 Rotas de produtos reais
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
