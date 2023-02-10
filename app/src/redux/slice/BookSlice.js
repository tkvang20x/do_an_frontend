import { createSlice } from "@reduxjs/toolkit";

// init state
const initialBookState = {
    title: "BOOK",
    /** ------- list ---------- */
    // init list data
    listBook: [],
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
    detailBook: {},
    /** ------- detail - end ---------- */
};

// List Project Slice
export const BookSlice = createSlice({
    name: "bookSlice",
    initialState: initialBookState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListBookReducer: (state, action) => {
            state.listBook = action.payload;
        },
        // load paging 
        loadPaginationFilter: (state, action) => {
            state.paginationFilter = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        saveDetailBook: (state, action) => {
            state.detailBook = action.payload;
        }
    },
});
