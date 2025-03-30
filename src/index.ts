import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Afiliado360 API rodando! 🚀');
});

app.get('/api/products', (_req, res) => {
  res.json([
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 200 }
  ]);
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
