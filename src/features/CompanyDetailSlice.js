import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getCompanies = createAsyncThunk(
    "getCompanies",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/company/getCompanies`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const getCompanyById = createAsyncThunk(
    "getCompanyById",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/company/getCompanyById/${data.id}`);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const companyDetails = createSlice({
    name: "companyDetails",
    initialState: {
        companies: [],
        currentCompany: "",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [getCompanies.pending]: (state) => {
            state.loading = true;
        },
        [getCompanies.fulfilled]: (state, action) => {
            state.companies = action.payload.data;
            state.loading = false;
        },
        [getCompanies.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default companyDetails.reducer;
