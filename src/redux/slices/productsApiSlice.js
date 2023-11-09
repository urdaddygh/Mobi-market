import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";
import axios from "axios";
import { getCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";

const initialState = {
  error: false,
  likeErr: false,
  likedErr:false,
  getMyProductsErr:false,
  products: [],
  product: {},
  likedProducts: [],
  myProducts:[],
  message:{}
};

let refresh = getCookie("refresh")
axios.interceptors.response.use(resp=>resp, async error =>{
  console.log(error, 'error')
  let refresh = getCookie("refresh")
  if(error.response.status===401){
      const res = await requests.getRefreshToken({refresh:refresh})
      setCookie("access", res.data.access)
      return console.log(res, 'res')
  }
})

export const getProducts = createAsyncThunk(
  "getProductsReducer/getProducts",
  async (data) => {
    try {
      const res = await requests.getProducts(data);
      return res.data;
    } catch (err) {
      if(err.response.status===401){
        console.log(refresh)
        const res = await requests.getRefreshToken({refresh:refresh})
        setCookie("access", res.data.access)
        return console.log(res, 'res')
    }
      console.log(err.response.status)
      
    }
  }
);
export const getLikedProducts = createAsyncThunk(
  "getProductsReducer/getLikedProducts",
  async (data) => {
    try {
      const res = await requests.getProductsLiked(data);
      return res.data;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);

export const addProduct = createAsyncThunk(
  "getProductsReducer/addProduct",
  async (data) => {
    try {
      console.log(data)
      const res = await requests.addProduct(data.formData);
      data.showSuccessMessage("Товар добавлен")
      data.actions.resetForm()
      data.updateProducts()
      data.setActiveSuccess(false)
      return res.data;
    } catch (err) {
      throw new Error(console.log(err));
    }
  }
);

export const getMyProducts = createAsyncThunk(
  "getProductsReducer/getMyProducts",
  async (data) => {
    try {
      const res = await requests.getMyProducts(data);
      return res.data;
    } catch (err) {
      
      throw new Error(console.log(err));
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
export const getLikedProductsForPagination = createAsyncThunk(
  "getProductsReducer/getLikedProductsForPagination",
  async (data) => {
    try {
      const res = await requests.getLikedProductsForPagination(data);
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
      const res = await requests.likeProduct(data.value);
      data.showSuccessMessage("Товар добавлен в понравившиеся")
      data.updatePage()
      return res.data;
    } catch (err) {
      console.log(err)
      data.showToastMessage("Подтвердите свой аккаунт пожалуйста")
      throw new Error(console.log(err.response));
    }
  }
);
export const unLikeProduct = createAsyncThunk(
  "getProductsReducer/unLikeProduct",
  async (data) => {
    try {
      const res = await requests.unLikeProduct(data.id);
      data.updatePage()
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const changeProduct = createAsyncThunk(
  "getProductsReducer/changeProduct",
  async (data) => {
    try {
      const res = await requests.changeProduct(data);
      data.showSuccessMessage("Товар изменен")
      data.updateProduct()
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "getProductsReducer/deleteProduct",
  async (data) => {
    try {
      const res = await requests.deleteProduct(data.id);
      data.showSuccessMessage("Товар удалён")
      data.updateProduct()
      data.closeModal()
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

export const clearStateProduct = createAsyncThunk("getProductsReducer/clearState", () => {
  return 
});

const productsApiSlice = createSlice({
  name: "getProductsReducer",
  initialState,
  extraReducers: {
    [clearStateProduct.fulfilled]: (state) => {
      state = initialState
    },
    [changeProduct.pending]: (state) => {
      state.error = false;
    },
    [changeProduct.fulfilled]: (state) => {
      state.error = true;
    },
    [changeProduct.rejected]: (state) => {
      state.error = false;
    },

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

    [getLikedProducts.pending]: (state) => {
      state.likedErr = false;
    },
    [getLikedProducts.fulfilled]: (state,action) => {
      state.likedProducts = action.payload;
      state.likedErr = true;
    },
    [getLikedProducts.rejected]: (state) => {
      state.likedErr = false;
    },

    [getMyProducts.pending]: (state) => {
      state.getMyProductsErr = false;
    },
    [getMyProducts.fulfilled]: (state,action) => {
      state.myProducts = action.payload;
      state.getMyProductsErr = true;
    },
    [getMyProducts.rejected]: (state) => {
      state.getMyProductsErr = false;
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

    [getLikedProductsForPagination.pending]: (state) => {
      state.error = false;
    },
    [getLikedProductsForPagination.fulfilled]: (state,action) => {
      state.likedProducts = action.payload;
      state.error = true;
    },
    [getLikedProductsForPagination.rejected]: (state) => {
      state.error = false;
    },

    [likeProduct.pending]: (state) => {
      state.likeErr = false;
    },
    [likeProduct.fulfilled]: (state, action) => {
      state.message = action.payload
      state.likeErr = true;
    },
    [likeProduct.rejected]: (state) => {
      state.likeErr = false;
    },

    [unLikeProduct.pending]: (state) => {
      state.likeErr = false;
    },
    [unLikeProduct.fulfilled]: (state, action) => {
      state.message = {message:"good!"}
      state.likeErr = true;
    },
    [unLikeProduct.rejected]: (state) => {
      state.likeErr = false;
    },

  },
});

export const productSlice = productsApiSlice.reducer;
