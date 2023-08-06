import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer
    }
})

export default store;