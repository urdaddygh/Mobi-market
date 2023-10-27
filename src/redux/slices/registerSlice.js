import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
};

export const registerEmail = createAsyncThunk(
    'register/registerEmail',
     (data) => {
        console.log(data)
        return data;
    }
);


export const postRegister = createAsyncThunk(
    'register/postRegister',
    async (data) => {
        // localStorage.removeItem('access')
        const res = await requests.registerApi(data.data);
        localStorage.setItem("access", res.data.access)
        // console.log("access", res.data); 
        data.navigate('/')
        data.showToSuccessMessage("Успех!")
        // localStorage.setItem('user_id', res.data.user_id)

        return res.data;
    }
);

// export const changePass = createAsyncThunk(
//     'auth/changePass',
//     async (data) => {
//         console.log("dsadsa", data)
//         const res = await requests.changePass(data.value);

//         console.log("change", res.data);
//         data.handleOpenSuccessModal()
//         return res.data;
//     }
// );

const authSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: {
        [registerEmail.pending]: (state) => {
            // console.log(action)
            state.error = true;
        },
        [postRegister.pending]: (state, action) => {
            console.log(action)
            state.error = true;
        },
        [postRegister.fulfilled]: (state) => {
            state.error = true;
        },
        [postRegister.rejected]: (state) => {
            state.error = true;
        },
    },
});

export const authSlices = authSlice.reducer;
