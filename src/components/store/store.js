import { configureStore } from "@reduxjs/toolkit";
import serviceSlice from "./serviceSlice";
const store = configureStore({
    reducer: {
        services: serviceSlice
    }
})
export default store;