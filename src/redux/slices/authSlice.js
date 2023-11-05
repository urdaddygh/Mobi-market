import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  removeCookie,
  setCookie,
} from "../../utils/cookieFunction/cookieFunction";
import { requests } from "../api";

const initialState = {
  error: false,
  user: {},
  verifyErr:false
};

export const postAuth = createAsyncThunk("auth/postAuth", async (data) => {
  removeCookie("access");
  removeCookie("refresh");
  try {
    const res = await requests.authApi(data.values);
    //   if(res.data)
    setCookie("access", res.data.access);
    setCookie("refresh", res.data.refresh);
    data.navigate("/main");
    // localStorage.setItem('user_id', res.data.user_id)
    return res.data;
  } catch (err) {
    data.showToErrMessage("Неверный логин или пароль ");
    throw new Error(err);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
   
      const res = await requests.forgotPassword(data.values);
     
      data.onClick();
      return res.data;
    } catch (error) {
      data.showErrMessage("Пользователь с таким номером телефона отсуствует")
      throw new Error(console.log(error))
    }
  }
);
export const resetPassApi = createAsyncThunk(
  "auth/resetPassApi",
  async (data) => {
    try {
      const res = await requests.resetPassApi(data);
      console.log("change", res.data);
      data.allRight();
      return res.data;
    } catch (error) {
      data.showErrMessage("Неверный код")
      throw new Error(console.log(error))
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data) => {
    try {
      const res = await requests.changePassword(data.values);
      console.log("change", res.data);
      data.setModalActive(false)
      return res.data;
    } catch (error) {
      // data.showErrMessage("Неверный код")
      throw new Error(console.log(error))
    }
  }
);

export const sendCodeApi = createAsyncThunk(
  "auth/sendCodeApi",
  async (data) => {
    try {
      const res = await requests.sendCodeApi(data.values);
      data.onClick();
      console.log(res.data)
      return res.data;
    } catch (error) {
      throw new Error(console.log(error))
    }
  }
);

export const verifyPhoneApi = createAsyncThunk(
  "auth/verifyPhoneApi",
  async (data) => {
    try {
      console.log(data)
      const res = await requests.verifyPhoneApi(data.values);
      data.showSuccessMessage("Данные успешно изменены");
      data.setSecondModalActive(false)
      console.log(res.data)
      return res.data;
    } catch (error) {
      data.setState(false)
      throw new Error(error)
    }
  }
);


export const changePass = createAsyncThunk("auth/changePass", async (data) => {
  console.log("dsadsa", data);
  const res = await requests.changePass(data.values);

  console.log("change", res.data);
  data.handleOpenSuccessModal();
  return res.data;
});

export const changeErr = createAsyncThunk("auth/changeErr", (data) => {
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [postAuth.pending]: (state) => {
      state.error = false;
      // console.log(action)
    },
    [postAuth.fulfilled]: (state, action) => {
      state.user = action.payload;
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
      state.user = action.payload;
    },
    [forgotPassword.rejected]: (state) => {
      state.error = true;
    },

    [sendCodeApi.pending]: (state) => {
      state.error = false;
    },
    [sendCodeApi.fulfilled]: (state) => {
      state.error = false;
    },
    [sendCodeApi.rejected]: (state) => {
      state.error = true;
    },

    [verifyPhoneApi.pending]: (state) => {
      state.error = false;
    },
    [verifyPhoneApi.fulfilled]: (state) => {
      state.error = false;
    },
    [verifyPhoneApi.rejected]: (state) => {
      state.error = true;
    },

    [changeErr.pending]: (state) => {
      state.error = false;
    },
    [changeErr.fulfilled]: (state, action) => {
      state.error = false;
      state.password = action.payload;
    },
    [changeErr.rejected]: (state) => {
      state.error = true;
    },

    [changePassword.pending]: (state) => {
      state.error = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.error = false;
      // state.password = action.payload;
    },
    [changePassword.rejected]: (state) => {
      state.error = true;
    },
  },
});

export const authSlices = authSlice.reducer;
