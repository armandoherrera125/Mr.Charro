import { configureStore } from "@reduxjs/toolkit";
import dispatcherReducer from "../slices/dispatcherRequest";
import ordenesReducer from "../slices/ordenesactivas";
export default configureStore({
    reducer: {
        ordenes: ordenesReducer,
        requestAgain: dispatcherReducer
    }
})