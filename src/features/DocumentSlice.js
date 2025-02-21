import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getTokenFromLocalStorage } from "../common";

export const getAllDocuments = createAsyncThunk(
  "getAllDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/document/getDocuments`,
        {
          params: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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

export const sendAgreementToEmp = createAsyncThunk(
  "sendAgreementToEmp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/document/createSignAgreementForHr`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkPdfSignStatusEmployee = createAsyncThunk(
  "checkPdfSignStatusEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/document/checkPdfSignStatusEmployee`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSignAgreementForEmployee = createAsyncThunk(
  "updateSignAgreementForEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/document/updateSignAgreementForEmployee`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMultiAgreementsToEmps = createAsyncThunk(
  "sendMultiAgreementsToEmps",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/document/createMultiSignAgreementsForEmployees`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLatestDocuments = createAsyncThunk(
  "getLatestDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/document/getLatestDocuments`,
        {
          params: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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

export const getPendingDocuments = createAsyncThunk(
  "getPendingDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/document/getPendingDocuments`,
        {
          params: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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

export const documentDetails = createSlice({
  name: "documentDetails",
  initialState: {
    documents: [],
    latestDocuments: [],
    pendingDocuments: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getAllDocuments.pending]: (state) => {
      state.loading = true;
    },
    [getAllDocuments.fulfilled]: (state, action) => {
      state.documents = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [sendAgreementToEmp.pending]: (state) => {
      state.loading = true;
    },
    [sendAgreementToEmp.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendAgreementToEmp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateSignAgreementForEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateSignAgreementForEmployee.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSignAgreementForEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [sendMultiAgreementsToEmps.pending]: (state) => {
      state.loading = true;
    },
    [sendMultiAgreementsToEmps.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendMultiAgreementsToEmps.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [checkPdfSignStatusEmployee.pending]: (state) => {
      state.loading = true;
    },
    [checkPdfSignStatusEmployee.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [checkPdfSignStatusEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getLatestDocuments.pending]: (state) => {
      state.loading = true;
    },
    [getLatestDocuments.fulfilled]: (state, action) => {
      state.latestDocuments = action.payload.data;
      state.loading = false;
    },
    [getLatestDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getPendingDocuments.pending]: (state) => {
      state.loading = true;
    },
    [getPendingDocuments.fulfilled]: (state, action) => {
      state.pendingDocuments = action.payload.data;
      state.loading = false;
    },
    [getPendingDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default documentDetails.reducer;
