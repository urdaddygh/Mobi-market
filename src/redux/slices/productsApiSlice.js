import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  likeErr:true,
  products:[],
  product:{},
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
export const getProductsById = createAsyncThunk(
  "getProductsReducer/getProductsById",
  async (data) => {
    try {
      const res = await requests.getProductsById(data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);
export const getProductsForPagination = createAsyncThunk(
  "getProductsReducer/getProductsForPagination",
  async (data) => {
    try {
      const res = await requests.getProductsForPagination(data);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);
export const likeProduct = createAsyncThunk(
  "getProductsReducer/likeProduct",
  async (data) => {
    try {
      const res = await requests.likeProduct(data);
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
    [getProductsById.pending]: (state) => {
      state.error = false;
    },
    [getProductsById.fulfilled]: (state,action) => {
      state.product = action.payload;
      state.error = true;
    },
    [getProductsById.rejected]: (state) => {
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
    [likeProduct.pending]: (state) => {
      state.likeErr = false;
    },
    [likeProduct.fulfilled]: (state,action) => {
      state.products = action.payload;
      state.likeErr = true;
    },
    [likeProduct.rejected]: (state) => {
      state.likeErr = false;
    },
  },
});

export const productSlice = productsApiSlice.reducer;
