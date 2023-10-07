import { configureStore } from "@reduxjs/toolkit";
import { authReducer, likeReducer } from "./Slicer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        like: likeReducer
    }
})