import express, { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Tipagem manual para garantir req.user
interface RequestWithUser extends Request {
  user?: {
    id: number;
  };
}

router.use(authenticateToken);

// 👉 Criar favorito
router.post('/', async (req: RequestWithUser, res) => {
  const { name, temperature, commission, price, score } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

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
  } catch (err) {
    res.status(400).json({ error: 'Erro ao salvar favorito' });
  }
});

// 👉 Listar favoritos
router.get('/', async (req: RequestWithUser, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      orderBy: { score: 'desc' },
    });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
});

export default router;
