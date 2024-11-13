import express, { Request, Response, NextFunction } from "express";
import { launchRocket } from "../services/warriorService";

export const handleLaunch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const warriorId = req.params.id;
        const missileId = req.params.missileId;
        if(!warriorId || !missileId){
            res.status(400).json({message: "you have to send the id of warrior and the missileId in the params"});
            return;
        }

        const updatedWarrior = await launchRocket(warriorId, missileId);
        res.status(200).json({success: true, message: "missile amount successfully substracted"});
    } 
    catch (error: any) {
        next(error);
    }
}