import { objectID } from "../../../backend/src/models/warriorModel";

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

export interface IRegister {
    username: string;
    password: string;
    organization: string;
    location: string | null;
}

export interface IExploation {
    warriorId: objectID;
    status: string;
    attacker: string;
}