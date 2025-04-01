import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'afiliado360supersecreto';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Senha inválida' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    res.json(user);
  } catch {
    res.status(400).json({ error: 'E-mail já cadastrado' });
  }
});

export default router;
