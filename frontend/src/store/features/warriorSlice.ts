import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { objectID } from "../../../../backend/src/models/warriorModel";
import { IDF, IRegister, Terorists } from "../../types/frontendTypes";
import { ILaunched, IMissileResource } from "../../../../backend/src/types/projectTypes";

export interface WarriorType {
    _id?: objectID;
    username: string;
    password: string;
    organization: Terorists | "IDF";
    location: IDF | null;
    resources: IMissileResource[];
    launchHistory: ILaunched[];
}

interface WarriorStateType {
    warrior: WarriorType | null;
    token: string | null;
    room: string | null;
    timeToHit: number | null;
    error: boolean;
    errorMessage: string | null;
    isLoading: boolean;
}

const BASE_URL = "http://localhost:3001/api";

const registerWarrior = createAsyncThunk("warrior/registerWarrior", async (data: IRegister) => {
    const body = data.location? data: {username: data.username, password: data.password, organization: data.organization};
    const response = await axios.post(`${BASE_URL}/register`, body);
    console.log(response.data);
    return response.data;
});

const initialState: WarriorStateType = {
    warrior: null, 
    token: null,
    room: null,
    timeToHit: null,
    error: false,
    errorMessage: null,
    isLoading: false
};

const warriorSlice = createSlice({
    name: "warrior",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        setTimeToHit: (state, action: PayloadAction<number | null>) => {
            state.timeToHit = action.payload;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(registerWarrior.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(registerWarrior.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message as string;
        })
        .addCase(registerWarrior.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.warrior = action.payload.newWarrior;
        })
    }
});

export default warriorSlice.reducer;