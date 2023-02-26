import { createSlice } from "@reduxjs/toolkit";

//init state
const initialState = { //reducer lưu trữ TT
    title: "LOGIN",
    //init list data
    token: "",
    dataToken: {}
};


//List Engine slice
export const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: initialState,
    reducers: {
        setToken :(state, action) => {
            state.token = action.payload;
        },
        setDataToken :(state, action) => {
            state.dataToken = action.payload;
        }
    }
});

