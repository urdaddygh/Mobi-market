import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";
import { registerSlices } from "./slices/registerSlice";
import { productSlice } from "./slices/productsApiSlice";


export const store = configureStore({
  reducer: {
    auth:authSlices,
    register:registerSlices,
    products:productSlice
  },
});
