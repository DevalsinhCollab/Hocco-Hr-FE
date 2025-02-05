import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios
import { getAuthToken, headers } from "./common";
import { getApisHeaders } from "../common";

export const SignUpAdmin = createAsyncThunk(
  "SignUpAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/signup`,
        { ...data, role: "A" },
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googlelogin = createAsyncThunk(
  "googlelogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/googlelogin`,
        { tokenId: data },
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/login`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getuserbytoken = createAsyncThunk(
  "getuserbytoken",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/getuserbytoken`,
        { token: token.token },
        { headers }
      );

      return response.data;
    } catch (error) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("companyId");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getuserbyid = createAsyncThunk(
  "getuserbyid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/users/getuser/${data}`,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validuser = createAsyncThunk(
  "validuser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/auth/updateuserbytoken/${data.token
        }`,
        { isValid: "1" },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAadharData = createAsyncThunk(
  "createAadharData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/aadhar/createAadharData`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAadharData = createAsyncThunk(
  "getAadharData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/aadhar/getAadharData`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/auth/updateUser/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAdharDataForExcel = createAsyncThunk(
  "getAllAdharDataForExcel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/aadhar/getAllAdharDataForExcel`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const switchCompany = createAsyncThunk(
  "switchCompany",
  async (data, { rejectWithValue }) => {

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/auth/switchCompany/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authDetail = createSlice({
  name: "authDetail",
  initialState: {
    auth: {},
    loading: false,
    error: null,
    aadharData: [],
  },
  extraReducers: {
    [SignUpAdmin.pending]: (state) => {
      state.loading = true;
    },
    [SignUpAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [SignUpAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.auth = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [googlelogin.pending]: (state) => {
      state.loading = true;
    },
    [googlelogin.fulfilled]: (state, action) => {
      state.auth = action.payload.user;
      state.loading = false;
      state.error = null;
    },
    [googlelogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getuserbytoken.pending]: (state) => {
      state.loading = true;
    },
    [getuserbytoken.fulfilled]: (state, action) => {
      state.loading = false;
      state.auth = action.payload.data;
      state.error = null;
    },
    [getuserbytoken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAadharData.pending]: (state) => {
      state.loading = true;
    },
    [getAadharData.fulfilled]: (state, action) => {
      state.loading = false;
      state.aadharData = action.payload.data;
      state.error = null;
    },
    [getAadharData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authDetail.reducer;
