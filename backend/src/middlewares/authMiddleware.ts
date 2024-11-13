import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authWithBearer = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization as string;
    
    if (!authHeader) {
      console.log("!authHeader");
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET || "your-super-secret-key") as { warriorId: string; username: string };
    (req as any).warrior = decoded;
    
    next();
  } 
  catch (error: any) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};