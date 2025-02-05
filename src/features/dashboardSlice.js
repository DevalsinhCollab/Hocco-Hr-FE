import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getTokenFromLocalStorage } from "../common";

export const getDashboardCount = createAsyncThunk(
    "getDashboardCount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/getDashboardCount`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${getTokenFromLocalStorage()}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const dfDashboard = createAsyncThunk(
    "dfDashboard",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/dfDashboard`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${getTokenFromLocalStorage()}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const disDashboard = createAsyncThunk(
    "disDashboard",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/dashboard/disDashboard`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${getTokenFromLocalStorage()}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

export const dashboardDetails = createSlice({
    name: "dashboardDetails",
    initialState: {
        employeeCount: 0,
        documentCount: 0,
        signedCount: 0,
        unSignedCount: 0,
        inProgressCount: 0,
        completedCount: 0,
        dfCount: 0,
        customerCount: 0,
        agreementCount: 0,
        disCount: 0,
        cfaCount: 0,
        vrsCount: 0,
        disTemplateCount: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [getDashboardCount.pending]: (state) => {
            state.loading = true;
        },
        [getDashboardCount.fulfilled]: (state, action) => {
            const { employeeCount, documentCount, unSignedCount, signedDocuments, completedCount, inProgressCount } = action.payload.data
            state.employeeCount = employeeCount
            state.documentCount = documentCount
            state.signedCount = signedDocuments
            state.unSignedCount = unSignedCount
            state.inProgressCount = inProgressCount
            state.completedCount = completedCount
            state.loading = false;
        },
        [getDashboardCount.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [dfDashboard.pending]: (state) => {
            state.loading = true;
        },
        [dfDashboard.fulfilled]: (state, action) => {
            const { dfCount, customerCount, agreementCount } = action.payload

            state.dfCount = dfCount
            state.customerCount = customerCount
            state.agreementCount = agreementCount
            state.loading = false;
        },
        [dfDashboard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [disDashboard.pending]: (state) => {
            state.loading = true;
        },
        [disDashboard.fulfilled]: (state, action) => {
            const { disCount, cfaCount, vrsCount, disTemplateCount } = action.payload

            state.disCount = disCount
            state.cfaCount = cfaCount
            state.vrsCount = vrsCount
            state.disTemplateCount = disTemplateCount
            state.loading = false;
        },
        [disDashboard.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default dashboardDetails.reducer;
