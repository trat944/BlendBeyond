import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

// Define el tipo del middleware utilizando los tipos de Express
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['jwt'];

  if (!token) {
    return res.sendStatus(401);
  }

  const secret = process.env.JWT_SECRET as Secret;

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    (req as any).user = user;
    next();
  });
};

export default authenticateToken;
