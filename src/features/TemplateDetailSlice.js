import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTemplate = createAsyncThunk(
  "createTemplate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/Template/createTemplate`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTemplates = createAsyncThunk(
  "getTemplates",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/Template/getTemplates`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTemplateForHtml = createAsyncThunk(
  "createTemplateForHtml",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/Template/createTemplateForHtml`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const htmlToPdf = createAsyncThunk(
  "htmlToPdf",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/Template/htmlToPdf`,
        { data }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTemplateById = createAsyncThunk(
  "getTemplateById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/Template/getTemplateById/${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchTemplates = createAsyncThunk(
  "searchTemplates",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/Template/searchTemplates`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const templateDetails = createSlice({
  name: "templateDetails",
  initialState: {
    templates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createTemplate.pending]: (state) => {
      state.loading = true;
    },
    [createTemplate.fulfilled]: (state, action) => {
      state.templates = state.templates.concat(action.payload.data);
      state.loading = false;
    },
    [createTemplate.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getTemplates.pending]: (state) => {
      state.loading = true;
    },
    [getTemplates.fulfilled]: (state, action) => {
      state.templates = action.payload.data;
      state.loading = false;
    },
    [getTemplates.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createTemplateForHtml.pending]: (state) => {
      state.loading = true;
    },
    [createTemplateForHtml.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createTemplateForHtml.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default templateDetails.reducer;
