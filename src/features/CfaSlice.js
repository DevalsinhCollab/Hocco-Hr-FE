import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addMultiCfa = createAsyncThunk(
  "addMultiCfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/cfa/createmulticfa`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCfas = createAsyncThunk(
  "getAllCfas",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/cfa/getcfas`,
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

export const deleteCfa = createAsyncThunk(
  "deleteCfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/cfa/deleteCfa/${data}`
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
        `${import.meta.env.VITE_BACKEND_API}/cfa/addDoc/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCfa = createAsyncThunk(
  "updateCfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/cfa/updateCfa/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CfaExcelDownload = createAsyncThunk(
  "CfaExcelDownload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/cfa/handleCfaExcelDownload`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSignAgreementForCfa = createAsyncThunk(
  "updateSignAgreementForCfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/cfaDocument/updateSignAgreementForCfa`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAgreementToCfa = createAsyncThunk(
  "sendAgreementToCfa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/cfaDocument/createSignAgreementForCfa`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cfaDetails = createSlice({
  name: "cfaDetails",
  initialState: {
    cfas: [],
    totalCount: 0,
    loading: false,
    error: null,
    cfa: {},
  },
  reducers: {},
  extraReducers: {
    [addMultiCfa.pending]: (state) => {
      state.loading = true;
    },
    [addMultiCfa.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addMultiCfa.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllCfas.pending]: (state) => {
      state.loading = true;
    },
    [getAllCfas.fulfilled]: (state, action) => {
      state.cfas = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllCfas.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteCfa.pending]: (state) => {
      state.loading = true;
    },
    [deleteCfa.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteCfa.rejected]: (state, action) => {
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

    [updateCfa.pending]: (state) => {
      state.loading = true;
    },
    [updateCfa.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateCfa.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateSignAgreementForCfa.pending]: (state) => {
      state.loading = true;
    },
    [updateSignAgreementForCfa.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSignAgreementForCfa.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [sendAgreementToCfa.pending]: (state) => {
      state.loading = true;
    },
    [sendAgreementToCfa.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendAgreementToCfa.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [CfaExcelDownload.pending]: (state) => {
      state.loading = true;
    },
    [CfaExcelDownload.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [CfaExcelDownload.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cfaDetails.reducer;
