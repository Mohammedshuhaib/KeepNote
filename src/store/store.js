import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../freatures/auth/authSlice'
import noteReducer from '../freatures/note/noteSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        note: noteReducer
    }
})