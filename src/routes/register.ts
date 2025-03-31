import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Exemplo simples — depois vamos salvar no banco
  res.status(201).json({ message: 'Usuário registrado com sucesso!', email });
});

export default router;
