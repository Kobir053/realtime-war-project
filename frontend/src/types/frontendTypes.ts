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
    organization: Terorists | "IDF";
    location: IDF | null;
}