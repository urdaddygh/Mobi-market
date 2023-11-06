import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
    isRegister:{}
};

export const checkUserApi = createAsyncThunk(
    'register/checkUserApi',
     async(data) => {
        try {
            const res = await requests.checkUser(data.values);
            localStorage.setItem("email", JSON.stringify(data.values));

            if(res.data.email){
                data.showToastMessage("Данная почта уже зарегистрирована")
            }
            if(res.data.username){
                data.showToastMessage("Данное имя пользователя уже занято")
            }
            if(!res.data.username && !res.data.email) data.navigate("/register/password")
            return res.data;
        } catch (error) {
                data.showToastMessage("Некорректная почта")
                console.log(error.response)
            throw new Error(error)
        }
    }
);


export const postRegister = createAsyncThunk(
    'register/postRegister',
    async (data) => {
        const res = await requests.registerApi(data.data);
        localStorage.setItem("access", res.data.access)
        data.navigate('/')
        data.showToSuccessMessage("Успех!")

        return res.data;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: {
        [checkUserApi.pending]: (state) => {
            // console.log(action)
            state.error = false;
        },
        [checkUserApi.fulfilled]: (state, action) => {
            state.isRegister = action.payload
            state.error = true;
        },
        [checkUserApi.rejected]: (state) => {
            state.error = false;
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

export const registerSlices = registerSlice.reducer;
