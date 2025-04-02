import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  try {
    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), description },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao salvar produto:', error);
    res.status(500).json({ error: 'Erro ao salvar produto' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

export default router;
