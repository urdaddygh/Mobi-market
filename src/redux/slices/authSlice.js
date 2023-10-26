import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
    password:{}
};

export const postAuth = createAsyncThunk(
    'auth/postAuth',
    async (data) => {
        // localStorage.removeItem('access')
        const res = await requests.authApi(data.values);
        localStorage.setItem("access", res.data.access)
        // console.log("access", res.data); 

        data.navigate('/main/serviceOne')
        localStorage.setItem('user_id', res.data.user_id)

        return res.data;
    }
);

export const changePass = createAsyncThunk(
    'auth/changePass',
    async (data) => {
        console.log("dsadsa", data)
        const res = await requests.changePass(data.value);

        console.log("change", res.data);
        data.handleOpenSuccessModal()
        return res.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [postAuth.pending]: (state) => {
            state.error = false;
        },
        [postAuth.fulfilled]: (state, action) => {
            state.error = false;
        },
        [postAuth.rejected]: (state) => {
            state.error = true;
        },

        [changePass.pending]: (state) => {
            state.error = false;
        },
        [changePass.fulfilled]: (state, action) => {
            state.error = false;
            state.password = action.payload
        },
        [changePass.rejected]: (state) => {
            state.error = true;
        },
    },
});

export const authSlices = authSlice.reducer;
