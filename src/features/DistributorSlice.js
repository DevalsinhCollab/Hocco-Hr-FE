import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addMultiDistributor = createAsyncThunk(
  "addMultiDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/distributor/createmultidistributor`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllDistributors = createAsyncThunk(
  "getAllDistributors",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/distributor/getdistributors`,
        {
          params: {
            page: data.page,
            status: data.status,
            signStatus: data.signStatus,
            search: data.search
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

export const deleteDistributor = createAsyncThunk(
  "deleteDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/distributor/deleteDistributor/${data}`
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
        `${import.meta.env.VITE_BACKEND_API}/distributor/addDoc/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDistributor = createAsyncThunk(
  "updateDistributor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/distributor/updateDistributor/${data.id
        }`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const DistributorExcelDownload = createAsyncThunk(
  "DistributorExcelDownload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/distributor/handleDistributorExcelDownload`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchDistributors = createAsyncThunk(
  "searchDistributors",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/distributor/searchDistributors`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createDocForSignDocuments = createAsyncThunk(
  "createDocForSignDocuments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/distributor/createDocForSignDocuments`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const distributorDetails = createSlice({
  name: "distributorDetails",
  initialState: {
    distributors: [],
    totalCount: 0,
    loading: false,
    error: null,
    distributor: {},
  },
  reducers: {},
  extraReducers: {
    [addMultiDistributor.pending]: (state) => {
      state.loading = true;
    },
    [addMultiDistributor.fulfilled]: (state, action) => {
      state.distributors = action.payload.data;
      state.loading = false;
    },
    [addMultiDistributor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllDistributors.pending]: (state) => {
      state.loading = true;
    },
    [getAllDistributors.fulfilled]: (state, action) => {
      state.distributors = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllDistributors.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteDistributor.pending]: (state) => {
      state.loading = true;
    },
    [deleteDistributor.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload.data;
      if (_id) {
        state.distributors = state.distributors.filter(
          (ele) => ele._id !== _id
        );
      }
      state.error = null;
    },
    [deleteDistributor.rejected]: (state, action) => {
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

    [updateDistributor.pending]: (state) => {
      state.loading = true;
    },
    [updateDistributor.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateDistributor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [DistributorExcelDownload.pending]: (state) => {
      state.loading = true;
    },
    [DistributorExcelDownload.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [DistributorExcelDownload.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    [createDocForSignDocuments.pending]: (state) => {
      state.loading = true;
    },
    [createDocForSignDocuments.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createDocForSignDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default distributorDetails.reducer;
