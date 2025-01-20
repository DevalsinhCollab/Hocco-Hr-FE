import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addMultiVrs = createAsyncThunk(
  "addMultiVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/vrs/createmultivrs`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllVrs = createAsyncThunk(
  "getAllVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/vrs/getvrs`,
        {
          params: {
            page: data.page,
            status: data.status,
            signStatus: data.signStatus,
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

export const deleteVrs = createAsyncThunk(
  "deleteVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/vrs/deleteVrs/${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addDoc = createAsyncThunk(
  "addDoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/vrs/addDoc/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateVrs = createAsyncThunk(
  "updateVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/vrs/updateVrs/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const VrsExcelDownload = createAsyncThunk(
  "VrsExcelDownload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/vrs/handleVrsExcelDownload`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSignAgreementForVrs = createAsyncThunk(
  "updateSignAgreementForVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/vrsDocument/updateSignAgreementForVrs`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAgreementToVrs = createAsyncThunk(
  "sendAgreementToVrs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/vrsDocument/createSignAgreementForVrs`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const vrsDetails = createSlice({
  name: "vrsDetails",
  initialState: {
    vrsDatas: [],
    totalCount: 0,
    loading: false,
    error: null,
    vrs: {},
  },
  reducers: {},
  extraReducers: {
    [addMultiVrs.pending]: (state) => {
      state.loading = true;
    },
    [addMultiVrs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addMultiVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllVrs.pending]: (state) => {
      state.loading = true;
    },
    [getAllVrs.fulfilled]: (state, action) => {
      state.vrsDatas = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteVrs.pending]: (state) => {
      state.loading = true;
    },
    [deleteVrs.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [addDoc.pending]: (state) => {
      state.loading = true;
    },
    [addDoc.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [addDoc.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateVrs.pending]: (state) => {
      state.loading = true;
    },
    [updateVrs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateSignAgreementForVrs.pending]: (state) => {
      state.loading = true;
    },
    [updateSignAgreementForVrs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSignAgreementForVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [sendAgreementToVrs.pending]: (state) => {
      state.loading = true;
    },
    [sendAgreementToVrs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendAgreementToVrs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [VrsExcelDownload.pending]: (state) => {
      state.loading = true;
    },
    [VrsExcelDownload.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [VrsExcelDownload.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default vrsDetails.reducer;
