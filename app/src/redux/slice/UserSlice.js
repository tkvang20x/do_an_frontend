import { createSlice } from "@reduxjs/toolkit";

// init state
const initialUserState = {
    title: "USER",
    /** ------- list ---------- */
    // init list data
    listUser: [],
    // init pagination
    paginationFilter: {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: -1,
    },
    // init pagination
    pagination: {
        page: 1,
        size: 10,
        totalPage: 0,
        totalItem: 10,
    },
    /** ------- list - end ---------- */

    /** ------- detail ---------- */
    // init details data
    detailUser: {},
    /** ------- detail - end ---------- */
};

// List Project Slice
export const UserSlice = createSlice({
    name: "userSlice",
    initialState: initialUserState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListUserReducer: (state, action) => {
            state.listUser = action.payload;
        },
        // load paging 
        loadPaginationFilter: (state, action) => {
            state.paginationFilter = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        saveDetailUser: (state, action) => {
            state.detailUser = action.payload;
        }
    },
});
