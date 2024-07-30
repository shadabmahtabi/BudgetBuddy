import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import statementSlice from "./reducers/statementSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        statements: statementSlice,
    }
})