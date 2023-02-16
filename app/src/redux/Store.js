import { configureStore } from "@reduxjs/toolkit";
import {
  LoginSlice,
} from "../redux/slice/LoginSlice";
import {
  BooksSlice,
} from "../redux/slice/BooksSlice";
import {
  GroupsSlice,
} from "../redux/slice/GroupsSlice";
import {
  BookSlice,
} from "../redux/slice/BookSlice";
import {
  UserSlice,
} from "../redux/slice/UserSlice";

import {
  VoucherSlice,
} from "../redux/slice/VoucherSlice";



export const store = configureStore({
  reducer: {
    loginReducer: LoginSlice.reducer,
    booksReducer: BooksSlice.reducer,
    groupsReducer: GroupsSlice.reducer,
    bookReducer: BookSlice.reducer,
    userReducer: UserSlice.reducer,
    voucherReducer: VoucherSlice.reducer
  },
});
