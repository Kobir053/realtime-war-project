import mongoose, { Schema, Types } from "mongoose";
import { IDF, ILaunched, IMissileResource, IResource, Terorists } from "../types/projectTypes";
import organizationModel, { Organization } from "./organizationModel";
import missileModel from "./missilesModel";

export interface Warrior {
    _id: Types.ObjectId;
    username: string;
    password: string;
    organization: Terorists | "IDF";
    location: IDF | null;
    resources: IMissileResource[];
    launchHistory: ILaunched[]; 
}

const warriorSchema = new Schema<Warrior>({
    username: {
        type: String,
        required: [true, "you must have a username"],
        maxlength: [30, "length of username can't be more than 30 letters"],
        minlength: [2, "length of username must be more than 2 letters"]
    },
    password: {
        type: String,
        required: [true, "you must have a password"],
        minlength: [4, "length of paasword must be more than 4 charachters"],
    },
    organization: {
        type: String,
        required: [true, "you must be related to some organization"],
    },
    location: {
        type: String || null,
        default: null,
    },
    resources: {
        type: [Object],
        default: []
    },
    launchHistory: {
        type: [{rocket: {type: String}, status: {type: String}}],
        default: [],
    },
});

const warriorModel = mongoose.model("Warrior", warriorSchema);

export default warriorModel;