import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ✅ Teste de saúde da API
app.get('/', (_req, res) => {
  res.send('Afiliado360 API rodando! 🚀');
});

// ✅ Rotas de autenticação: /api/login e /api/register
app.use('/api', authRoutes);

// ✅ Rota de produtos simulados
app.get('/api/products', (_req, res) => {
  res.json([
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 200 }
  ]);
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
