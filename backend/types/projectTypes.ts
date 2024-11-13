import { Missile } from "../models/missilesModel";

export enum IDF {
    NORTH = "North",
    SOUTH = "South",
    CENTER = "Center",
    WESTBANK = "West Bank"
};

export enum Terorists {
    HEZBOLLAH = "Hezbollah",
    HAMAS = "Hamas",
    IRGC = "IRGC",
    HOUTHIS = "Houthis"
}

export interface IResource {
    name: string;
    amount: number;
}

export interface IMissileResource {
    missile: Missile;
    amount: number;
}

// const org: Organization = organizationModel.find({name: "IDF - North"})[0];

// let res: IMissileResource[] = [];

// org.resources.map((val: IResource) => {
//     let missile = missileModel.find({name: val.name})[0];
//     res.push({missile: missile, amount: val.amount});
// });