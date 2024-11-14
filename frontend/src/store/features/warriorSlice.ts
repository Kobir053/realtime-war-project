import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { objectID } from "../../../../backend/src/models/warriorModel";
import { IDF, IExploation, IRegister, Terorists } from "../../types/frontendTypes";
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
    error: boolean;
    errorMessage: string | null;
    isLoading: boolean;
}

const BASE_URL = "http://localhost:3001/api";

export const registerWarrior = createAsyncThunk("warrior/registerWarrior", async (data: IRegister) => {
    const body = data.location.length > 0? data: {username: data.username, password: data.password, organization: data.organization};
    const response = await axios.post(`${BASE_URL}/register`, body);
    console.log("response of register: "+response.data);
    return response.data;
});

export const loginWarrior = createAsyncThunk("warrior/loginWarrior", async (data: {username: string, password: string}) => {
    const response = await axios.post(`${BASE_URL}/login`, data);
    localStorage.setItem("warriorToken", JSON.stringify(response.data.token));
    console.log("response of login: "+response.data);
    return response.data;
});

export const launchMissile = createAsyncThunk("warrior/launchMissile", async(data: {warriorId: string, missileId: string}) => {
    const token = JSON.parse(localStorage.getItem("warriorToken")!);
    const response = await axios.put(`${BASE_URL}/warrior/${data.warriorId}/launched/${data.missileId}`, {}, {headers: {Authorization: `Bearer ${token}`}});
    console.log("response of launch missile: " + response.data);
    return response.data;
});

export const exploationOfMissile = createAsyncThunk("warrior/exploationOfMissile", async (data: IExploation) => {
    const token = JSON.parse(localStorage.getItem("warriorToken")!);
    const response = await axios.put(`${BASE_URL}/warrior/${data.warriorId}/exploaded`, {status: data.status, attacker: data.attacker}, {headers: {Authorization: `Bearer ${token}`}});
    console.log("response of exploation: " + response.data);
    return response.data;
});

const initialState: WarriorStateType = {
    warrior: null, 
    token: null,
    room: null,
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
        .addCase(loginWarrior.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(loginWarrior.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message as string;
        })
        .addCase(loginWarrior.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.token = action.payload.token;
            state.warrior = action.payload.warrior;
            if(action.payload.warrior.location)
                state.room = `IDF - ${action.payload.warrior.location}`;
        })
        .addCase(launchMissile.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(launchMissile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message as string;
        })
        .addCase(launchMissile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.warrior = action.payload.updatedWarrior;
        })
        .addCase(exploationOfMissile.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(exploationOfMissile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message as string;
        })
        .addCase(exploationOfMissile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.warrior = action.payload.updatedWarrior;
        })
    }
});

export const { setRoom } = warriorSlice.actions;

export default warriorSlice.reducer;