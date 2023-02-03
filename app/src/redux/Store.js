import { configureStore } from "@reduxjs/toolkit";
import {
  LoginSlice,
} from "../redux/slice/LoginSlice";
import {
  BooksSlice,
} from "../redux/slice/BooksSlice";



export const store = configureStore({
  reducer: {
    loginReducer: LoginSlice.reducer,
    booksReducer: BooksSlice.reducer
  },
});
