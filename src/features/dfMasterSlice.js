import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getApisHeaders } from "../common";

export const getAllDFMaster = createAsyncThunk(
  "getAllDFMaster",
  async (data, { rejectWithValue }) => {
    let newHeaders = getApisHeaders();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/getdfmaster`,
        {
          params: {
            page: data.page,
            pageSize: data.pageSize,
            assetSerialNumber: data.assetSerialNumber,
            customer: data.customer,
            barCode: data.barCode,
            search: data.search
          },
          headers: newHeaders.headers
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

export const getDFMasterById = createAsyncThunk(
  "getDFMasterById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/getdfmasterbyId/${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMultiDFMaster = createAsyncThunk(
  "addMultiDFMaster",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/addmultidfmaster`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDfMasterTrackingStatus = createAsyncThunk(
  "updateDfMasterTrackingStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_API
        }/dfmaster/updateDfMasterTrackingStatus/${data.id}`,
        data
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAsset = createAsyncThunk(
  "updateAsset",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/updateAsset/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDFByAssetSerialNumber = createAsyncThunk(
  "getDFByAssetSerialNumber",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/getDFByAssetSerialNumber`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllAssetsForExcel = createAsyncThunk(
  "getAllAssetsForExcel",
  async (data, { rejectWithValue }) => {
    let newHeaders = getApisHeaders()

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/getAllAssetsForExcel`,
        {
          params: {
            assetSerialNumber: data.assetSerialNumber,
            customer: data.customer,
            barCode: data.barCode,
            search: data.search,
          },
          headers: newHeaders.headers
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchSerialNumberAndBarCode = createAsyncThunk(
  "searchSerialNumberAndBarCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/dfmaster/searchSerialNumberAndBarCode`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDFByCustCode = createAsyncThunk(
  "getDFByCustCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/dfmaster/getDFByCustCode`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DFMasterDetails = createSlice({
  name: "DFMasterDetails",
  initialState: {
    dfMaster: [],
    dfMasterInfo: {},
    loading: false,
    error: null,
    totalCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getAllDFMaster.pending]: (state) => {
      state.loading = true;
    },
    [getAllDFMaster.fulfilled]: (state, action) => {
      state.dfMaster = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    [getAllDFMaster.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getDFMasterById.pending]: (state) => {
      state.loading = true;
    },
    [getDFMasterById.fulfilled]: (state, action) => {
      state.dfMasterInfo = action.payload;
      state.loading = false;
    },
    [getDFMasterById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [addMultiDFMaster.pending]: (state) => {
      state.loading = true;
    },
    [addMultiDFMaster.fulfilled]: (state, action) => {
      state.dfMaster = action.payload;
      state.loading = false;
    },
    [addMultiDFMaster.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateDfMasterTrackingStatus.pending]: (state) => {
      state.loading = true;
    },
    [updateDfMasterTrackingStatus.fulfilled]: (state, action) => {
      state.dfMaster = state.dfMaster.map((ele) =>
        ele._id === action.payload.data.data._id
          ? action.payload.data.data
          : ele
      );
      state.loading = false;
    },
    [updateDfMasterTrackingStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateAsset.pending]: (state) => {
      state.loading = true;
    },
    [updateAsset.fulfilled]: (state, action) => {
      state.dfMaster = state.dfMaster.map((ele) =>
        ele._id === action.payload.data._id ? action.payload.data : ele
      );
      state.loading = false;
    },
    [updateAsset.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllAssetsForExcel.pending]: (state) => {
      state.loading = true;
    },
    [getAllAssetsForExcel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getAllAssetsForExcel.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default DFMasterDetails.reducer;
