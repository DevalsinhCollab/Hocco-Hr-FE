import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios
import { getAuthToken } from "./common";

const headers = {
  "Content-Type": "application/json",
  signewayAPI: `${import.meta.env.VITE_SIGN_E_WAY_API}`,
};

export const crateuser = createAsyncThunk(
  "crateuser",
  async (data, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/crateuser/${token.token}`,
        data,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "getUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/auth/getusers`,
        { headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsersById = createAsyncThunk(
  "getUsersById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/users/getusers/${data}`,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/users/deleteuser/${id}`,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateuser = createAsyncThunk(
  "updateuser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/users/updateuser/${data._id}`,
        data,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersDetail = createSlice({
  name: "usersDetail",
  initialState: {
    users: [],
    allUsers: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [crateuser.pending]: (state) => {
      state.loading = true;
    },
    [crateuser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload.data);
      state.error = null;
    },
    [crateuser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getUsersById.pending]: (state) => {
      state.loading = true;
    },
    [getUsersById.fulfilled]: (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
      state.error = null;
    },
    [getUsersById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      if (_id) {
        state.users = state.users.filter((ele) => ele._id !== _id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateuser.pending]: (state) => {
      state.loading = true;
    },
    [updateuser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele._id === action.payload._id ? action.payload : ele
      );
    },
    [updateuser]: (state, action) => {
      state.loading = false;
      state.action = action.payload.message;
    },
  },
});

export default usersDetail.reducer;
