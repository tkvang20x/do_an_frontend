import { createSlice } from "@reduxjs/toolkit";

// init state
const initialBooksState = {
    title: "BOOKS",
    /** ------- list ---------- */
    // init list data
    listBooks: [],
    // init pagination
    paginationFilter: {
        page: 1,
        size: 10,
        order_by: "created_time",
        order: 1,
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
    detailsProject: {},
    /** ------- detail - end ---------- */
};

// List Project Slice
export const BooksSlice = createSlice({
    name: "booksSlice",
    initialState: initialBooksState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListBooksReducer: (state, action) => {
            state.listBooks = action.payload;
        },
        // load paging 
        loadPaginationFilter: (state, action) => {
            state.paginationFilter = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
});
