import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from '../../axios-client';


const initialState = {
    loading: false,
    error: false,
    data: [],
    message: "",
    searchTerm: ""
}
const serviceSlice = createSlice({
    name:"service",
    initialState,
    reducers: {
        setSearchTerm: (state,action) => {
            state.searchTerm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder 
        .addCase(getServices.pending,(state)=>{
           state.loading = true
        })
        .addCase(getServices.fulfilled,(state,action)=>{
            state.data = action.payload
            state.loading = false
        })
        .addCase(getServices.rejected,(state,action)=>{
            state.loading = true
            state.error =  true
            state.message = action.payload
        })
    }

});

export const { setSearchTerm } =serviceSlice.actions;
export default serviceSlice.reducer;
export const getServices = createAsyncThunk('services/get',async ({activePage},thunkAPI) => {
    try {
        const res = await axiosClient.get('/services/?page='+activePage)
        .then(({data}) =>  data.data);
        return res;
    } catch (err) {
        const message = (err.response && err.response.data) || err.message;
        return thunkAPI.rejectWithValue(message);
    }
})
