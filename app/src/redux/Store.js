import { configureStore } from "@reduxjs/toolkit";
import {
  SimpleInputSlice,
} from "../redux/slice/SimpleInputSlice";



export const store = configureStore({
  reducer: {
    simpleInputSlice: SimpleInputSlice.reducer,

  },
});
