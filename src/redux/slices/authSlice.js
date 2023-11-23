import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../../utils/cookieFunction/cookieFunction";
import { requests } from "../api";

const initialState = {
  error: false,
  user: {},
  verifyErr:false,
  access:{}
};

export const postAuth = createAsyncThunk("auth/postAuth", async (data) => {
  removeCookie("access");
  removeCookie("refresh");
  try {
    const res = await requests.authApi(data.values);
    setCookie("access", res.data.access);
    setCookie("refresh", res.data.refresh);
    data.navigate("/main");
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
      data.setState(false)
      data.onClick();
      return res.data;
    } catch (error) {
      data.showErrMessage("Пользователь с таким номером телефона отсуствует")
      data.setState(true)
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
      localStorage.setItem("access", res.data.access);
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
      data.showToSuccessMessage("Пароль изменён")
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
      data.setErr(false)
      console.log(res.data)
      return res.data;
    } catch (error) {
      data.setErr(true)
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
export const clearStateAuth = createAsyncThunk("auth/clearState", (data) => {
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

    [clearStateAuth.fulfilled]: (state) => {
      state = initialState;
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

    [resetPassApi.pending]: (state) => {
      state.error = false;
    },
    [resetPassApi.fulfilled]: (state, action) => {
      state.error = false;
      state.access = action.payload;
    },
    [resetPassApi.rejected]: (state) => {
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
