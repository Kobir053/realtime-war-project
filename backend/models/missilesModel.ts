import mongoose, { Schema, Types } from "mongoose";

export interface Missile extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const missileSchema = new Schema<Missile>({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    speed: {
        type: Number,
    },
    intercepts: {
        type: [String],
        default: []
    },
    price: {
        type: Number
    }
});

const missileModel = mongoose.model("Missile", missileSchema);

export default missileModel;