import { Router } from 'express';
const router = Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Usuário registrado com sucesso!' });
});

export default router;
