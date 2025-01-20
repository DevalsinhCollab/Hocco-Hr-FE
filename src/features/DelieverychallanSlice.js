import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getApisHeaders } from "../common";

export const createdeliverychallan = createAsyncThunk(
  "createdeliverychallan",
  async (data, { rejectWithValue }) => {
    try {
      let dbData = {
        ...data[0],
        goods: data[1],
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/deliveryChallan/createChallan`,
        dbData,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getChallan = createAsyncThunk(
  "getChallan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/deliveryChallan/getChallan`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getChallanbyid = createAsyncThunk(
  "getChallanbyid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/deliveryChallan/getChallanbyid/${data}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DeliveryChallan = createSlice({
  name: "DeliveryChallan",
  initialState: {
    DeliveryChallan: [],
    DeliveryChallanInfo: {},
    loading: false,
    error: null,
  },
  extraReducers: {
    [createdeliverychallan.pending]: (state) => {
      state.loading = true;
    },
    [createdeliverychallan.fulfilled]: (state, action) => {
      state.loading = false;
      state.DeliveryChallan.push(action.payload.data);
    },
    [createdeliverychallan.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [getChallan.pending]: (state) => {
      state.loading = true;
    },
    [getChallan.fulfilled]: (state, action) => {
      state.loading = false;
      state.DeliveryChallan = action.payload.data;
    },
    [getChallan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getChallanbyid.pending]: (state) => {
      state.loading = true;
    },
    [getChallanbyid.fulfilled]: (state, action) => {
      state.loading = false;
      state.DeliveryChallanInfo = action.payload.data;
    },
    [getChallanbyid.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default DeliveryChallan.reducer;
