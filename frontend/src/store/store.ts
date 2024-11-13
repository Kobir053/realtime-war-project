import { configureStore } from "@reduxjs/toolkit";
import warriorReducer from './features/warriorSlice';

export const store = configureStore({
    reducer: {
        warrior: warriorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;