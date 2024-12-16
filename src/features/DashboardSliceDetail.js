import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getApisHeaders } from "../common";

export const getAllDashboardCountEmp = createAsyncThunk(
  "getAllDashboardCountEmp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/dashboard/empDashboard`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dashboardDetails = createSlice({
  name: "dashboardDetails",
  initialState: {
    employeeCount: 0,
    documentCount: 0,
    hrSignedCount: 0,
    hrUnSignedCount: 0,
    hrInProgressCount: 0,
    hrCompletedCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getAllDashboardCountEmp.pending]: (state) => {
      state.loading = true;
    },
    [getAllDashboardCountEmp.fulfilled]: (state, action) => {
      state.loading = false;
      state.employeeCount = action.payload.employeeCount;
      state.documentCount = action.payload.docCount;
      state.hrSignedCount = action.payload.signedCount;
      state.hrUnSignedCount = action.payload.unSignedCount;
      state.hrInProgressCount = action.payload.inProcessCount;
      state.hrCompletedCount = action.payload.completedCount;
      state.error = null;
    },
    [getAllDashboardCountEmp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },
  },
});

export default dashboardDetails.reducer;
