import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { getApisHeaders, getTokenFromLocalStorage } from "../common";

export const getAllCustomer = createAsyncThunk(
  "getAllCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/customer/getcustomers`,
        {
          params: {
            page: data.page,
            pageSize: data.pageSize,
            customer: data?.customer,
            search: data.search
          },
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

export const addUser = createAsyncThunk(
  "addUser",
  async (data, { rejectWithValue }) => {
    try {
      const sendData = {
        ownerName: data.ownerName,
        streetName: "1",
        area: "1",
        city: "1",
        pinCode: "1",
        district: "1",
        state: "1",
        ownerContact: data.ownerContact,
        communicationContact: "1",
        email: data.email,
        distributorMapping: "1",
        tseName: "1",
        psrName: "1",
        customerType: "1",
        channel: "1",
        onBoardingType: "1",
        brandConverted: "1",
        mboEBO: "1",
        competitionIcecream: "1",
        outletOverallIcecreamAnnualSalesLacs: "1",
        hoccoEstimatedIcecreamAnnualSalesLacs: "1",
        aadharCard: "1",
        aadharCardImg: "img",
        panCard: "1",
        panCardImg: "img",
        shopEstablishment: "1",
        shopEstablishmentImg: "img",
        gstNo: "1",
        gstNoImg: "img",
        ownerPhoto: "img",
        password: "123",
        userType: "user",
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/createcustomer`,
        sendData
      );
      return response["data"];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMultiCustomer = createAsyncThunk(
  "addMultiCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/createmulticustomer`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "updateCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/updateCustomer/${
          data.id
        }`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "getCustomerById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/customer/getCustomerById/${data.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/deleteCustomer/${data}`,
        {},
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCustomerByCustCode = createAsyncThunk(
  "getCustomerByCustCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/getCustomerByCustCode`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchCustomers = createAsyncThunk(
  "searchCustomers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/searchCustomers`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllCustomersForExcel = createAsyncThunk(
  "getAllCustomersForExcel",
  async (data, { rejectWithValue }) => {
    let newHeaders = getApisHeaders();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/customer/getAllCustomersForExcel`,
        { params: { customer: data.customer }, headers: newHeaders.headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchByAsmName = createAsyncThunk(
  "searchByAsmName",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/searchByAsmName`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchByTsmName = createAsyncThunk(
  "searchByTsmName",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/customer/searchByTsmName`,
        data,
        getApisHeaders()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLatestCustomers = createAsyncThunk(
  "getLatestCustomers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/customer/getLatestCustomers`,
        {
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

export const customerDetails = createSlice({
  name: "customerDetails",
  initialState: {
    customers: [],
    latestCustomers: [],
    loading: false,
    error: null,
    customer: {},
    totalCount: 0,
  },
  reducers: {},
  extraReducers: {
    [getAllCustomer.pending]: (state) => {
      state.loading = true;
    },
    [getAllCustomer.fulfilled]: (state, action) => {
      state.customers = action.payload.data;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    },
    [getAllCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addUser.pending]: (state) => {
      state.loading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      state.customers.push(action.payload.user);
      state.loading = false;
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addMultiCustomer.pending]: (state) => {
      state.loading = true;
    },
    [addMultiCustomer.fulfilled]: (state, action) => {
      state.customers = action.payload.data;
      state.loading = false;
    },
    [addMultiCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateCustomer.pending]: (state) => {
      state.loading = true;
    },
    [updateCustomer.fulfilled]: (state, action) => {
      state.customers = state.customers.map((ele) =>
        ele._id === action.payload.data._id ? action.payload.data : ele
      );
      state.loading = false;
    },
    [updateCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getCustomerById.pending]: (state) => {
      state.loading = true;
    },
    [getCustomerById.fulfilled]: (state, action) => {
      state.customer = action.payload.data;
      state.loading = false;
    },
    [getCustomerById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteCustomer.pending]: (state) => {
      state.loading = true;
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload.data;
      if (_id) {
        state.customers = state.customers.filter((ele) => ele._id !== _id);
      }
      state.error = null;
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getAllCustomersForExcel.pending]: (state) => {
      state.loading = true;
    },
    [getAllCustomersForExcel.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    [getAllCustomersForExcel.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getLatestCustomers.pending]: (state) => {
      state.loading = true;
    },
    [getLatestCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.latestCustomers = action.payload.data
      state.error = null;
    },
    [getLatestCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default customerDetails.reducer;
