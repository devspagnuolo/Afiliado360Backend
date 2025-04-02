import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'afiliado360supersecreto';

// 🔐 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('📩 Tentativa de login:', email);

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.warn('❌ Usuário não encontrado:', email);
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.warn('❌ Senha inválida para:', email);
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('✅ Login bem-sucedido para:', email);

    return res.json({ token });
  } catch (error) {
    console.error('❗ Erro interno no login:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// ✅ Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('📝 Tentando registrar novo usuário:', email);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    console.log('✅ Usuário registrado com sucesso:', user.email);
    return res.status(201).json(user);
  } catch (error) {
    console.error('❗ Erro no registro:', error);
    return res.status(400).json({ error: 'E-mail já cadastrado' });
  }
});

export default router;
