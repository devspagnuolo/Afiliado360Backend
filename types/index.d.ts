declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      } & Partial<User>; // `User` precisa ser declarado ou importado, caso esteja sendo usado.
    }
  }
}

export {};
