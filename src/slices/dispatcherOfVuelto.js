import { createSlice } from "@reduxjs/toolkit";
export const dispatcherVueltoSlice = createSlice({
    name: 'vueltoMovement',
    initialState: 0,
    reducers: {
        showVuelto: (state,action) =>{
           return state + action.payload;
        },
        resetVuelto: (state,action) =>{
            state = 0;
            return state;
        }

    },
})
export const {showVuelto,resetVuelto} = dispatcherVueltoSlice.actions;
export default dispatcherVueltoSlice.reducer;