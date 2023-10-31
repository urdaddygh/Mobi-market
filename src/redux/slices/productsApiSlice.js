import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  products:[],
};

export const getProducts = createAsyncThunk(
  "getProductsReducer/getProducts",
  async (data) => {
    try {
      const res = await requests.getProducts(data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);
export const getProductsForPagination = createAsyncThunk(
  "getProductsReducer/getProducts",
  async (data) => {
    try {
      const res = await requests.getProductsForPagination(data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const productsApiSlice = createSlice({
  name: "getProductsReducer",
  initialState,
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.error = false;
    },
    [getProducts.fulfilled]: (state,action) => {
      state.products = action.payload;
      state.error = true;
    },
    [getProducts.rejected]: (state) => {
      state.error = false;
    },
    [getProductsForPagination.pending]: (state) => {
      state.error = false;
    },
    [getProductsForPagination.fulfilled]: (state,action) => {
      state.products = action.payload;
      state.error = true;
    },
    [getProductsForPagination.rejected]: (state) => {
      state.error = false;
    },
  },
});

export const productSlice = productsApiSlice.reducer;
