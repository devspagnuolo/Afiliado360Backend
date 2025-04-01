import express from 'express';
import { fetchHotmartProducts } from '../services/hotmartService';

const router = express.Router();

router.get('/products', async (_req, res) => {
  try {
    const products = await fetchHotmartProducts();
    res.json(products);
  } catch (err) {
    console.error('Erro ao buscar produtos da Hotmart:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos da Hotmart' });
  }
});

export default router;
