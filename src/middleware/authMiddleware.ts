import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'afiliado360supersecreto';

// ✅ Definindo a interface direto aqui
interface RequestWithUser extends Request {
  user?: {
    id: number;
  };
}

export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.user = { id: decoded.userId }; // agora reconhecido 💡
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido' });
  }
};
