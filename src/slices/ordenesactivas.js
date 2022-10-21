import { createSlice } from "@reduxjs/toolkit";
export const ordenesSlice = createSlice({
    name: 'ordenes',
    initialState: {
        value: [],
    },
    reducers: {
        addOrder: (state, action) =>{
            state.value.push(action.payload)
        },
        deleteOrder : state =>{
            state.value -= 1
        },
        // incrementByAmount : (state, action) =>{
        //     state.value += action.payload
        // }

    },
})
export const {addOrder,decrement} = ordenesSlice.actions;
export default ordenesSlice.reducer;