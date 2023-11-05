import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setCookie,
} from "../../utils/cookieFunction/cookieFunction";
import { requests } from "../api";

const initialState = {
  error: false,
  user: {},
};

export const updateUserInfo = createAsyncThunk(
  "profile/updateUserInfo",
  async (data) => {
    console.log(data)
    try {
      const res = await requests.updateUserInfo(data.values);
      data.showSuccessMessage("Данные успешно изменены")
      return res.data;
    } catch (err) {
        console.log(err.date)
      data.showToErrMessage("Некорректные данные");
      throw new Error(err);
    }
  }
);

export const getInfoOfUser = createAsyncThunk(
  "profile/getInfoOfUser",
  async () => {
    try {
      const res = await requests.getInfoOfUser();
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: {
    [updateUserInfo.pending]: (state) => {
      state.error = false;
      // console.log(action)
    },
    [updateUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = false;
    },
    [updateUserInfo.rejected]: (state) => {
      // console.log(action)
      state.error = true;
    },

    [getInfoOfUser.pending]: (state) => {
      state.error = false;
      // console.log(action)
    },
    [getInfoOfUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = false;
    },
    [getInfoOfUser.rejected]: (state) => {
      // console.log(action)
      state.error = true;
    },
  },
});

export const profileSlices = profileSlice.reducer;