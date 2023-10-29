import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
};

export const postAuth = createAsyncThunk(
    'auth/postAuth',
    async (data) => {
        // localStorage.removeItem('access')
        const res = await requests.authApi(data.values);
        setCookie("access", res.data.access)
        setCookie("refresh", res.data.refresh)
        console.log("great", res.data);
        data.navigate('/main/serviceOne')
        // localStorage.setItem('user_id', res.data.user_id)
        return res.data;
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data) => {
        console.log("dsadsa", data)
        // const res = await requests.forgotPassword(data.values);

        // console.log("change", res.data);
        data.onClick()
        // return res.data;
    }
);


export const changePass = createAsyncThunk(
    'auth/changePass',
    async (data) => {
        console.log("dsadsa", data)
        const res = await requests.changePass(data.values);

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
            // console.log(action)
        },
        [postAuth.fulfilled]: (state) => {
            // console.log(action)
            state.error = false;
        },
        [postAuth.rejected]: (state) => {
            // console.log(action)
            state.error = true;
        },
        [forgotPassword.pending]: (state) => {
            state.error = false;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.error = false;
            state.password = action.payload
        },
        [forgotPassword.rejected]: (state) => {
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
