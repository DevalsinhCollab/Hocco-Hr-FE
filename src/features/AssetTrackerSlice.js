import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getApisHeaders, getTokenFromLocalStorage } from "../common";

export const addMultiAssets = createAsyncThunk(
  "addMultiAssets",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/AssetTracker/createMultiAssets`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllAssetsTracker = createAsyncThunk(
  "getAllAssetsTracker",
  async (data, { rejectWithValue }) => {
    try {
      // Make the API request with headers
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/AssetTracker/getMultiAssets`,
        {
          params: {
            page: data.page,
            pageSize: data.pageSize,
            customer: data.customer,
            assetSerialNumber: data.assetSerialNumber,
            asmName: data.asmName,
            tsmName: data.tsmName,
            search: data.search
          },
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Static header for testing
            "Content-Type": "application/json",
          },
        }
      );

      // Return the response data
      return response.data;
    } catch (error) {
      // Log the error for debugging
      console.error("API request failed:", error);

      // Provide a more descriptive error message if needed
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateAssetTrackerStatus = createAsyncThunk(
  "updateAssetTrackerStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API
        }/AssetTracker/updateAssetTrackerStatus/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assetAgreement = createAsyncThunk(
  "assetAgreement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/AssetTracker/assetAgreement`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAgreement = createAsyncThunk(
  "sendAgreement",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/signAgreement/createSignAgreement`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUnSignAgreement = createAsyncThunk(
  "getAllUnSignAgreement",
  async (data, { rejectWithValue }) => {
    try {
      let allAgreements = [];
      let skip = 0;
      const limit = 10;
      let total = 0;

      do {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API
          }/signAgreement/getAllUnSignAgreement`,
          { params: { skip, limit } }
        );

        const { data, total: newTotal } = response.data;

        allAgreements = [...allAgreements, ...data];
        skip += limit;
        total = newTotal;
      } while (allAgreements.length < total);

      return allAgreements;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllAgreements = createAsyncThunk(
  "getAllAgreements",
  async (data, { rejectWithValue }) => {
    try {
      let allAgreements = [];
      let skip = 0;
      const limit = 15;
      let total = 0;

      do {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/signAgreement/getAllAgreements`,
          { params: { skip, limit } }
        );

        const { data, total: newTotal } = response.data;

        allAgreements = [...allAgreements, ...data];
        skip += limit;
        total = newTotal;
      } while (allAgreements.length < total);

      return allAgreements;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeBase64 = createAsyncThunk(
  "changeBase64",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/signAgreement/changeBase64`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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

export const assetRelease = createAsyncThunk(
  "assetRelease",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/AssetTracker/assetRelease`,
        data,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAadharLink = createAsyncThunk(
  "sendAadharLink",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/agreement/sendAadharLink`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAadharLinkViaOtp = createAsyncThunk(
  "sendAadharLinkViaOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/agreement/sendAadharLinkViaOtp`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendAgreementToAsmTsm = createAsyncThunk(
  "sendAgreementToAsmTsm",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/signAgreement/sendAgreementToAsmTsm`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllAgreementsViaPagination = createAsyncThunk(
  "getAllAgreementsViaPagination",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/signAgreement/getAllAgreementsViaPagination`,
        data,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAssetsBySerialNumber = createAsyncThunk(
  "getAssetsBySerialNumber",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/AssetTracker/getAssetsBySerialNumber`,
        {
          params: { assetSerialNumber: data.assetSerialNumber },
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Static header for testing
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const openDocument = createAsyncThunk(
  "openDocument",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/signAgreement/openDocument`,
        data,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllSignAgreementForExcel = createAsyncThunk(
  "getAllSignAgreementForExcel",
  async (data, { rejectWithValue }) => {
    try {
      let newHeaders = getApisHeaders();

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/signAgreement/getAllSignAgreementForExcel`,
        {
          params: {
            search: data.search
          },
          headers: newHeaders.headers,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAgreementByAssetId = createAsyncThunk(
  "getAgreementByAssetId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/AssetTracker/getAgreementByAssetId/${data.id}`,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const openDocumentAssestTracker = createAsyncThunk(
  "openDocumentAssestTracker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API
        }/signAgreement/openDocumentAssestTracker`,
        data,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAllUnSignedDocs = createAsyncThunk(
  "checkAllUnSignedDocs",
  async (data, { rejectWithValue }) => {
    try {
      let newHeaders = getApisHeaders();

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/signAgreement/checkAllUnSignedDocs`,
        { headers: newHeaders.headers }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLatestAssetTracker = createAsyncThunk(
  "getLatestAssetTracker",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API
        }/AssetTracker/getLatestAssetTracker`,
        getApisHeaders()
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assetsTrackerDetails = createSlice({
  name: "assetsTrackerDetails",
  initialState: {
    assetsTracker: [],
    loading: false,
    error: null,
    assetsTrackerDetails: {},
    allAgreements: [],
    assetsTrackerWithoutAggregate: [],
    latestAssetTrackers: [],
    totalCount: 0,
  },
  reducers: {},
  extraReducers: {
    [addMultiAssets.pending]: (state) => {
      state.loading = true;
    },
    [addMultiAssets.fulfilled]: (state, action) => {
      state.assetsTracker = state.assetsTracker.concat(action.payload.data);
      state.loading = false;
    },
    [addMultiAssets.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    [getAllAssetsTracker.pending]: (state) => {
      state.loading = true;
    },
    [getAllAssetsTracker.fulfilled]: (state, action) => {
      state.assetsTracker = action.payload.aggregateData;
      state.assetsTrackerWithoutAggregate = action.payload.data;
      state.totalCount = action.payload.total;
      state.loading = false;
    },
    [getAllAssetsTracker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    [getAllAgreements.pending]: (state) => {
      state.loading = true;
    },
    [getAllAgreements.fulfilled]: (state, action) => {
      state.allAgreements = action.payload;
      state.loading = false;
    },
    [getAllAgreements.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    [assetRelease.pending]: (state) => {
      state.loading = true;
    },
    [assetRelease.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [assetRelease.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    [getAllSignAgreementForExcel.pending]: (state) => {
      state.loading = true;
    },
    [getAllSignAgreementForExcel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getAllSignAgreementForExcel.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    // [updateAssetTrackerStatus.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateAssetTrackerStatus.fulfilled]: (state, action) => {
    //   state.assetsTracker = state.assetsTracker.map((ele) =>
    //     ele._id === action.payload.data.data._id
    //       ? action.payload.data.data
    //       : ele
    //   );
    //   state.loading = false;
    // },
    // [updateAssetTrackerStatus.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },

    [checkAllUnSignedDocs.pending]: (state) => {
      state.loading = true;
    },
    [checkAllUnSignedDocs.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [checkAllUnSignedDocs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },

    [getLatestAssetTracker.pending]: (state) => {
      state.loading = true;
    },
    [getLatestAssetTracker.fulfilled]: (state, action) => {
      state.loading = false;
      state.latestAssetTrackers = action.payload.data
    },
    [getLatestAssetTracker.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.data;
    },
  },
});

export default assetsTrackerDetails.reducer;
