import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/registerSlice";



export const store = configureStore({
  reducer: {
    auth:authSlices,
  },
});
