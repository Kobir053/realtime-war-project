import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { soldierRegister, terroristRegister, warriorLogin } from "../services/authService";
import warriorModel, { Warrior } from "../models/warriorModel";

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
      console.log(username, password);
      const warrior: Warrior = await warriorLogin(username, password);
  
      const token = jwt.sign(
        { warriorId: warrior._id, username: warrior.username },
        process.env.JWT_SECRET || "your-super-secret-key",
        { expiresIn: '24h' }
      );

      console.log(warrior);
  
      res.json({token: token, warrior: warrior });
    } 
    catch (error: any) {
      console.log("catch error on login", error.message);
      next(error);
    }
}

export const validWarrior = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const auth = req.headers.authorization as string;
        const token = auth.split(' ')[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET || "your-super-secret-key") as { warriorId: string; username: string };
        if(!decoded)
          throw new Error("warrior is not valid");
        const warrior = await warriorModel.findById(decoded.warriorId);
        if(!warrior)
          throw new Error("warrior not founded on DB");
        res.status(200).json({warrior, token});
    } 
    catch (error: any) {
      next(error);
    }
}