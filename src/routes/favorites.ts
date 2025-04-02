import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken);

// Salvar favorito
router.post('/', async (req, res) => {
  const { name, temperature, commission, price, score } = req.body;

  if (!req.user?.id) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  if (!name || !temperature || !commission || !price || !score) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: {
        name,
        temperature,
        commission,
        price,
        score,
        userId: req.user.id,
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Erro ao salvar favorito:', error);
    res.status(500).json({ error: 'Erro ao salvar favorito' });
  }
});

// Listar favoritos
router.get('/', async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites);
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
});

export default router;
