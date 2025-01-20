import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'signewayAPI': `${import.meta.env.VITE_SIGN_E_WAY_API}`
}

export const addDocs = createAsyncThunk("addDocs", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/esign/adddocs`,
            data,
            {headers}
        );
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getEsignDocs = createAsyncThunk("getEsignDocs", async (id, { rejectWithValue }) => {
    try {
        let url;
        if (id[1] != null) {
            url = `${import.meta.env.VITE_BACKEND_API}/esign/getEsigndocsbyuserid/${id[0]}`;
        }
        else {
            url = `${import.meta.env.VITE_BACKEND_API}/esign/getEsigndocsbyadminid/${id[0]}`;
        }
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) { 
        return rejectWithValue(error.response.data);
    }
})

export const updateDoc = createAsyncThunk("updateDoc", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/esign/updateDocs/${data[0]}`,
            data[1],
        );
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



export const esignDocDetails = createSlice({
    name: "esignDocDetails",
    initialState: {
        esignDoc: [],
        loading: false,
        error: null,
    },
    extraReducers: {

        [addDocs.pending]: (state) => {
            state.loading = true;
        },
        [addDocs.fulfilled]: (state, action) => {
            state.loading = false;
            state.esignDoc.push(action.payload);
            state.error = null;
        },
        [addDocs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [updateDoc.pending]: (state) => {
            state.loading = true;
        },
        [updateDoc.fulfilled]: (state, action) => {
            state.loading = false;
            state.esignDoc = state.esignDoc.map((ele) =>
                ele._id === action.payload.id ? action.payload : ele
            );
        },
        [updateDoc.rejected]: (state, action) => {
            state.loading = false;
            state.action = action.payload.message
        },

        [getEsignDocs.pending]: (state) => {
            state.loading = true;
        },
        [getEsignDocs.fulfilled]: (state, action) => {
            state.loading = false;
            state.esignDoc = action.payload ;
            state.error = null;
        },
        [getEsignDocs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export default esignDocDetails.reducer;