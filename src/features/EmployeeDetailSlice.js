import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getTokenFromLocalStorage } from "../common";

export const addMultiEmployees = createAsyncThunk(
  "addMultiEmployees",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/employee/createmultiemployees`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/employee/createEmployee`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  "getAllEmployees",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/employee/getEmployees`,
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

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/employee/deleteEmployee/${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/employee/updateEmployee/${data._id}`,
        data
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
        `${import.meta.env.VITE_BACKEND_API}/employee/addDoc/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeSignType = createAsyncThunk(
  "changeSignType",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/employee/changeSignType/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const EmployeeExcelDownload = createAsyncThunk(
  "EmployeeExcelDownload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/employee/handleEmployeeExcelDownload`,
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

export const searchEmployees = createAsyncThunk(
  "searchEmployees",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/employee/searchEmployees`,
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

export const getEmployeesById = createAsyncThunk(
  "getEmployeesById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/employee/getEmployeesById/${data.id}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const employeeDetails = createSlice({
  name: "employeeDetails",
  initialState: {
    employees: [],
    totalCount: 0,
    loading: false,
    error: null,
    customer: {},
  },
  reducers: {},
  extraReducers: {
    [addMultiEmployees.pending]: (state) => {
      state.loading = true;
    },
    [addMultiEmployees.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addMultiEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [createEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createEmployee.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getAllEmployees.fulfilled]: (state, action) => {
      state.employees = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [deleteEmployee.rejected]: (state, action) => {
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

    [updateEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [changeSignType.pending]: (state) => {
      state.loading = true;
    },
    [changeSignType.fulfilled]: (state, action) => {
      state.employees = state.employees.map((ele) =>
        ele._id === action.payload.data._id ? action.payload.data : ele
      );
      state.loading = false;
    },
    [changeSignType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default employeeDetails.reducer;
