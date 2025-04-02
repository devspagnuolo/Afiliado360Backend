import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// Aplica o middleware de autenticação em todas as rotas
router.use(authMiddleware);

// 🔖 Salvar um produto como favorito
router.post('/', async (req, res) => {
  const userId = req.user?.id;
  const { name, temperature, commission, price, score } = req.body;

  try {
    const favorite = await prisma.favorite.create({
      data: {
        name,
        temperature,
        commission,
        price,
        score,
        userId,
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error('❗ Erro ao salvar favorito:', error);
    res.status(500).json({ error: 'Erro ao salvar favorito' });
  }
});

// 📄 Listar favoritos do usuário autenticado
router.get('/', async (req, res) => {
  const userId = req.user?.id;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(favorites);
  } catch (error) {
    console.error('❗ Erro ao buscar favoritos:', error);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
});

export default router;
