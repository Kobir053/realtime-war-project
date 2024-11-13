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

export interface ILaunched {
    rocket: string;
    status: "Hit" | "Intercepted";
}