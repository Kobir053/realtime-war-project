import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { objectID } from "../../../../backend/src/models/warriorModel";
import { IDF, IExploation, IRegister, Terorists } from "../../types/frontendTypes";
import { ILaunched, IMissileResource } from "../../../../backend/src/types/projectTypes";
import { Missile } from "../../../../backend/src/models/missilesModel";

export interface WarriorType {
    _id?: objectID;
    username: string;
    password: string;
    organization: Terorists | "IDF";
    location: IDF | null;
    resources: IMissileResource[];
    launchHistory: ILaunched[] | null;
    currentLaunches: Missile[] | null;
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
    const body = data.location? data: {username: data.username, password: data.password, organization: data.organization};
    const response = await axios.post(`${BASE_URL}/auth/register`, body);
    console.log("response of register: "+response.data);
    return response.data;
});

export const loginWarrior = createAsyncThunk("warrior/loginWarrior", async (data: {username: string, password: string}) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    localStorage.setItem("warriorToken", JSON.stringify(response.data.token));
    console.log("response of login: "+response.data);
    return response.data;
});

export const launchMissile = createAsyncThunk("warrior/launchMissile", async(data: {warriorId: string, missileName: string}) => {
    const token = JSON.parse(localStorage.getItem("warriorToken")!);
    const response = await axios.put(`${BASE_URL}/warrior/${data.warriorId}/launched`, data.missileName, {headers: {Authorization: `Bearer ${token}`}});
    console.log("response of launch missile: " + response.data);
    return response.data;
});

export const exploationOfMissile = createAsyncThunk("warrior/exploationOfMissile", async (data: IExploation) => {
    const token = JSON.parse(localStorage.getItem("warriorToken")!);
    const response = await axios.put(`${BASE_URL}/warrior/${data.warriorId}/exploaded`, {status: data.status, attacker: data.attacker}, {headers: {Authorization: `Bearer ${token}`}});
    console.log("response of exploation: " + response.data);
    return response.data;
});

export const validateWarrior = createAsyncThunk("warrior/validateWarrior", async () => {
    const token = JSON.parse(localStorage.getItem("warriorToken")!);
    const response = await axios.get(`${BASE_URL}/auth/validate`, {headers: {Authorization: `Bearer ${token}`}});
    console.log("response of validation: " + response.data);
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
        setWarriorRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
        addToCurrentLaunches: (state, action: PayloadAction<Missile>) => {
            (state.warrior!.currentLaunches as Missile[]).push(action.payload);
            localStorage.setItem("currentLaunches", JSON.stringify(state.warrior!.currentLaunches));
        },
        removeLaunchFromCurrentLaunches: (state, action: PayloadAction<Missile>) => {
            const missileIndex = (state.warrior!.currentLaunches as Missile[]).findIndex((m: Missile) => m.id === action.payload.id);
            if(missileIndex > -1)
                (state.warrior!.currentLaunches as Missile[]).splice(missileIndex, 1);
            localStorage.setItem("currentLaunches", JSON.stringify(state.warrior!.currentLaunches));
        },
        setCurrentLaunches: (state, action: PayloadAction<Missile[]>) => {
            (state.warrior!.currentLaunches as Missile[]) = [...action.payload];
            // localStorage.setItem("currentLaunches", JSON.stringify(state.warrior!.currentLaunches));
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
            console.log("login failed ", action.error.message);
        })
        .addCase(loginWarrior.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.token = action.payload.token;
            state.warrior = action.payload.warrior;
            if(action.payload.warrior.location)
                state.room = `IDF - ${action.payload.warrior.location}`;
            alert(state.warrior?.toString());
            alert("succeeded to log in: " +state.warrior?.location);
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
        .addCase(validateWarrior.pending, (state) => {
            state.isLoading = true;
            state.error = false;
            state.errorMessage = null;
        })
        .addCase(validateWarrior.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.errorMessage = action.error.message as string;
        })
        .addCase(validateWarrior.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.errorMessage = null;
            state.warrior = action.payload.warrior;
            state.token = action.payload.token;
            state.room = state.warrior?.location? `${state.warrior.organization} - ${state.warrior.location}`: null;
        })
    }
});

export const { setWarriorRoom, addToCurrentLaunches, removeLaunchFromCurrentLaunches, setCurrentLaunches } = warriorSlice.actions;

export default warriorSlice.reducer;