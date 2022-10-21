import { configureStore } from "@reduxjs/toolkit";
import ordenesReducer from "../slices/ordenesactivas";
export default configureStore({
    reducer: {
        ordenes: ordenesReducer,
    }
})