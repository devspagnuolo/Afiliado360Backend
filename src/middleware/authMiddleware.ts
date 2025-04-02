import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'afiliado360supersecreto';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.user = { id: decoded.userId }; // Aqui o TypeScript precisa saber que 'user' existe
    next();
  });
}
