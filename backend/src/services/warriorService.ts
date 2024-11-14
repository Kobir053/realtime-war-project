import { Missile } from "../models/missilesModel";
import warriorModel, { Warrior } from "../models/warriorModel";
import { IMissileResource } from "../types/projectTypes";


export const launchRocket = async (id: string, missileName: string): Promise<Warrior> => {
    try {
        const warrior = await warriorModel.findById(id);
        if(!warrior)
            throw new Error(`warrior with id ${id} not founded`);

        const missileIndex = warrior.resources.findIndex((m: IMissileResource) => m.missile.name == missileName);
        if(missileIndex < 0)
            throw new Error("the missile with name "+missileName+" wasn't found in the resources");

        warrior.resources[missileIndex].amount -= 1;
        await warrior.save();

        return warrior;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to launch a rocket due to error: " + error.message);
    }
}

export const exploadedRocket = async (id: string, status: "Hit" | "Intercepted", attacker: string): Promise<Warrior> => {
    try {
        const warrior = await warriorModel.findById(id);
        if(!warrior)
            throw new Error(`warrior with id ${id} not founded`);

        warrior.launchHistory.push({rocket: attacker, status: status});
        await warrior.save();

        return warrior;
    } 
    catch (error: any) {
        throw new Error("an error occured while trying to handle exploation of rocket due to error: " + error.message);
    }
}

// export const exploadedRocketOfDefender = async (id: string, missileId: string, status: "Hit" | "Intercepted", attackerName: string): Promise<Warrior> => {
//     try {
//         const warrior = await warriorModel.findById(id);
//         if(!warrior)
//             throw new Error(`warrior with id ${id} not founded`);

//         const missileIndex = warrior.resources.findIndex((m: IMissileResource) => m.missile.id == missileId)
//         if(missileIndex < 0)
//             throw new Error("the missile with id "+missileId+" wasn't found in the resources");

//         const attacker = warrior.resources[missileIndex].missile.intercepts.find((i: string) => i === attackerName);
//         if(!attacker){
//             throw new Error("you have to enter the attacker name in the body");
//         }

//         warrior.launchHistory.push({rocket: attacker, status: status});
//         await warrior.save();

//         return warrior;
//     } 
//     catch (error: any) {
//         throw new Error("an error occured while trying to handle exploation of rocket due to error: " + error.message);
//     }
// }