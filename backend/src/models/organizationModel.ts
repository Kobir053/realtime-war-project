import mongoose, { Schema, Types } from "mongoose";
import { IResource } from "../types/projectTypes";
import missileModel from "./missilesModel";

export interface Organization {
    _id: Types.ObjectId;
    name: string;
    resources: IResource[];
    budget: number;
}

const organizationSchema = new Schema<Organization>({
    name: {
        type: String,
    },
    resources: {
        type: [Object],
        default: []
    },
    budget: {
        type: Number,
    },
});

const organizationModel = mongoose.model("Organization", organizationSchema);

export default organizationModel;