import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios

const headers = {
    'Content-Type': 'application/json',
    'signewayAPI': `${import.meta.env.VITE_SIGN_E_WAY_API}`
};

export const SetProfileData = createAsyncThunk("SetProfileData", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/profile/setprofile/${data[0]}`,
            data[1],
            { headers }
        );
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getprofilebyadmin = createAsyncThunk("getprofilebyadmin", async(id, {rejectWithValue}) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/profile/getprofilebyadmin/${id}`,
            {headers}
        )
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const profileDetail = createSlice({
    name: "profileDetail",
    initialState: {
        profile: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [SetProfileData.pending]: (state) => {
            state.loading = true;
        },
        [SetProfileData.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = action.payload
            state.error = null;
        },
        [SetProfileData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        [getprofilebyadmin.pending]: (state) => {
            state.loading = true;
        },
        [getprofilebyadmin.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = action.payload
            state.error = null;
        },
        [getprofilebyadmin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default profileDetail.reducer;