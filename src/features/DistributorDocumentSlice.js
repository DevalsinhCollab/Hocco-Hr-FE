import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const getAllDistDocuments = createAsyncThunk(
  "getAllDistDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/getDistDocuments`,
        { params: { page: data.page, pageSize: data.pageSize } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const sendAgreementToDistributor = createAsyncThunk(
  "sendAgreementToDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/createSignAgreementForDistributor`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkPdfSignStatusDistributor = createAsyncThunk(
  "checkPdfSignStatusDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/checkPdfSignStatusDistributor`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSignAgreementForDistributor = createAsyncThunk(
  "updateSignAgreementForDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/updateSignAgreementForDistributor`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const expiredDocuments = createAsyncThunk(
  "expiredDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/expiredDocuments`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const nearExpiryDocuments = createAsyncThunk(
  "nearExpiryDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API
        }/distributorDocument/nearExpiryDocuments`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const distributorDocumentDetails = createSlice({
  name: "distributorDocumentDetails",
  initialState: {
    documents: [],
    expiredData: [],
    nearExpiryData: [],
    loading: false,
    error: null,
    totalCount: 0,
    totalExpiredCount: 0,
    totalNearExpiryCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getAllDistDocuments.pending]: (state) => {
      state.loading = true;
    },
    [getAllDistDocuments.fulfilled]: (state, action) => {
      state.documents = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllDistDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [sendAgreementToDistributor.pending]: (state) => {
      state.loading = true;
    },
    [sendAgreementToDistributor.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendAgreementToDistributor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateSignAgreementForDistributor.pending]: (state) => {
      state.loading = true;
    },
    [updateSignAgreementForDistributor.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSignAgreementForDistributor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [checkPdfSignStatusDistributor.pending]: (state) => {
      state.loading = true;
    },
    [checkPdfSignStatusDistributor.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [checkPdfSignStatusDistributor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [expiredDocuments.pending]: (state) => {
      state.loading = true;
    },
    [expiredDocuments.fulfilled]: (state, action) => {
      state.loading = false;
      state.expiredData = action.payload.data;
      state.totalExpiredCount = action.payload.totalCount;
    },
    [expiredDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [nearExpiryDocuments.pending]: (state) => {
      state.loading = true;
    },
    [nearExpiryDocuments.fulfilled]: (state, action) => {
      state.loading = false;
      state.nearExpiryData = action.payload.data;
      state.totalNearExpiryCount = action.payload.totalCount;
    },
    [nearExpiryDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default distributorDocumentDetails.reducer;
