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



export const store = configureStore({
  reducer: {
    loginReducer: LoginSlice.reducer,
    booksReducer: BooksSlice.reducer,
    groupsReducer: GroupsSlice.reducer
  },
});
