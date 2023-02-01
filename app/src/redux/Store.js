import { configureStore } from "@reduxjs/toolkit";
import {
  LoginSlice,
} from "../redux/slice/LoginSlice";



export const store = configureStore({
  reducer: {
    loginSlice: LoginSlice.reducer,

  },
});
