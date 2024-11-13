import { Missile } from "../models/missilesModel";
import warriorModel, { Warrior } from "../models/warriorModel";
import { IMissileResource } from "../types/projectTypes";


export const launchRocket = async (id: string, missileId: string): Promise<Warrior> => {
    try {
        const warrior = await warriorModel.findById(id);
        if(!warrior)
            throw new Error(`warrior with id ${id} not founded`);

        const missileIndex = warrior.resources.findIndex((m: IMissileResource) => m.missile.id == missileId)
        if(missileIndex < 0)
            throw new Error("the missile with id "+missileId+" wasn't found in the resources");

        warrior.resources[missileIndex].amount -= 1;
        await warrior.save();

        return warrior;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to launch a rocket due to error: " + error.message);
    }
}

export const exploadedRocket = async (id: string, missileId: string, status: "Hit" | "Intercepted"): Promise<Warrior> => {
    try {
        const warrior = await warriorModel.findById(id);
        if(!warrior)
            throw new Error(`warrior with id ${id} not founded`);

        const missileIndex = warrior.resources.findIndex((m: IMissileResource) => m.missile.id == missileId)
        if(missileIndex < 0)
            throw new Error("the missile with id "+missileId+" wasn't found in the resources");

        const rocketName = warrior.resources[missileIndex].missile.name;
        warrior.launchHistory.push({rocket: rocketName, status: status});
        await warrior.save();

        return warrior;
    } 
    catch (error: any) {
        throw new Error("an error occured while trying to handle exploation of rocket due to error: " + error.message);
    }
}