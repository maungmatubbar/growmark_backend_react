import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from '../../axios-client';


const initialState = {
    data: [],
}
const serviceSlice = createSlice({
    name:"service",
    initialState,
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder 
        .addCase(getServices.fulfilled,(state,action)=>{
            state.data = action.payload
        })
    }

});

//export const { getServices } =serviceSlice.actions;
export default serviceSlice.reducer;
export const getServices = createAsyncThunk('services/get',async ({activePage}) => {
    const res = await axiosClient.get('/services/?page='+activePage)
        .then(({data}) =>  data.data);
        return res;
})
