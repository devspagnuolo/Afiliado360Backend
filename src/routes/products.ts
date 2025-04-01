import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// 📦 Criar produto
router.post('/', async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
  }

  const product = await prisma.product.create({
    data: { name, price: parseFloat(price), description },
  });

  res.status(201).json(product);
});

// 📦 Listar produtos
router.get('/', async (_req, res) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(products);
});

export default router;
