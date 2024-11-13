import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { soldierRegister, terroristRegister, warriorLogin } from "../services/authService";

export const handleRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password, organization } = req.body;
        if(!req.body.location){
            const newWarrior = await terroristRegister({username, password, organization});
            res.status(201).json({success: true, message: "terrorist registered successfully", newWarrior});
        }
        else{
            const location = req.body.location;
            const newWarrior = await soldierRegister({username, password, organization, location});
            res.status(201).json({success: true, message: "soldier registered successfully", newWarrior});
        }
    } 
    catch (error) {
      next(error);
    }
}

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const warrior: any = warriorLogin(username, password);
  
      const token = jwt.sign(
        { warriorId: warrior._id, username: warrior.username },
        process.env.JWT_SECRET || "your-super-secret-key",
        { expiresIn: '24h' }
      );
  
      res.json({token: token, warrior: warrior });
    } 
    catch (error: any) {
      next(error);
    }
}