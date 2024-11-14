import express, { Request, Response, NextFunction } from "express";
import { exploadedRocket, launchRocket } from "../services/warriorService";

export const handleLaunch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const warriorId = req.params.id;
        const missileName = req.body.missileName;
        if(!warriorId || !missileName){
            res.status(400).json({message: "you have to send the id of warrior and the missileId in the params"});
            return;
        }

        const updatedWarrior = await launchRocket(warriorId, missileName);
        res.status(200).json({success: true, message: "missile amount successfully substracted", updatedWarrior});
    } 
    catch (error: any) {
        next(error);
    }
}

export const handleExploation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const warriorId = req.params.id;
        if(!warriorId){
            res.status(400).json({message: "you have to send the id of warrior and the missileId in the params"});
            return;
        }
        
        const status = req.body.status;
        const attacker = req.body.attacker;
        if(!status || !attacker){
            res.status(400).json({message: "you have to send the status of the rocket in the body"});
            return;
        }

        const updatedWarrior = await exploadedRocket(warriorId, status, attacker);
        res.status(200).json({success: true, message: "succeeded to update the launchHistory of the warrior", updatedWarrior});
    } 
    catch (error: any) {
        next(error);
    }
}