import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";
import { registerSlices } from "./slices/registerSlice";


export const store = configureStore({
  reducer: {
    auth:authSlices,
    register:registerSlices,

  },
});
