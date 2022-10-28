import { createSlice } from "@reduxjs/toolkit";
export const ordenesSlice = createSlice({
    name: 'ordenes',
    initialState: [],
    reducers: {
        addOrder: (state, action) =>{
            state.push(action.payload)
        },
        deleteOrder : (state, action) =>{
            return state.filter((values, index)=>index !==action.payload);
          }
        // incrementByAmount : (state, action) =>{
        //     state.value += action.payload
        // }

    },
})
export const {addOrder,deleteOrder} = ordenesSlice.actions;
export default ordenesSlice.reducer;