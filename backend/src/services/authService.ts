import missileModel, { Missile } from "../models/missilesModel";
import organizationModel from "../models/organizationModel";
import warriorModel, { Warrior } from "../models/warriorModel";
import { IMissileResource, IResource } from "../types/projectTypes";
import bcrypt from "bcrypt";


export const terroristRegister = async (data: {username: string, password: string, organization: string}): Promise<Warrior> => {
    try {
        console.log("org: ", data.organization);
        const myOrganization = await organizationModel.findOne({name: data.organization});
        if(!myOrganization)
            throw new Error("organization you are trying to join not found");

        let mySources: IMissileResource[] = [];
        myOrganization.resources.forEach(async (r: IResource) => {
            const myMissile: Missile | null = await missileModel.findOne({name: r.name});
            if(!myMissile)
                throw new Error("missile in organization's resource not found");
            mySources.push({missile: myMissile, amount: r.amount});
        });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newTerrorist = await warriorModel.create({
            username: data.username, 
            password: hashedPassword, 
            organization: data.organization,
            resources: mySources 
        });

        return newTerrorist;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to register a terrorist" + error.message);
    }
}

export const soldierRegister = async (data: {username: string, password: string, organization: string, location: string}): Promise<Warrior> => {
    try {
        const idfLocation = `${data.organization} - ${data.location}`;
        const myOrganization = await organizationModel.findOne({name: idfLocation});
        if(!myOrganization)
            throw new Error("organization you are trying to join not found");

        let mySources: IMissileResource[] = [];
        myOrganization.resources.forEach(async (r: IResource) => {
            const myMissile: Missile | null = await missileModel.findOne({name: r.name});
            if(!myMissile)
                throw new Error("missile in organization's resource not found");
            mySources.push({missile: myMissile, amount: r.amount});
        });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newSoldier = await warriorModel.create({
            username: data.username, 
            password: hashedPassword, 
            organization: data.organization,
            location: data.location,
            resources: mySources 
        });

        return newSoldier;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to register a soldier" + error.message);
    }
}

export const warriorLogin = async (username: string, password: string): Promise<Warrior> => {
    try {
        const warrior = await warriorModel.findOne({username});
        if(!warrior)
            throw new Error("warrior not found!");

        const comparedPassword = await bcrypt.compare(password, warrior.password);
        if(!comparedPassword)
            throw new Error("Invalid Password");

        return warrior;
    } 
    catch (error: any) {
        throw new Error("error occured while trying to logging in" + error.message);
    }
}