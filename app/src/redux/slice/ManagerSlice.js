import { createSlice } from "@reduxjs/toolkit";

// init state
const initialManagerState = {
    title: "MANAGER",
    /** ------- list ---------- */
    // init list data
    listManager: [],
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
    detailManager: {},
    /** ------- detail - end ---------- */
};

// List Project Slice
export const ManagerSlice = createSlice({
    name: "managerSlice",
    initialState: initialManagerState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListManagerReducer: (state, action) => {
            state.listManager = action.payload;
        },
        // load paging 
        loadPaginationFilter: (state, action) => {
            state.paginationFilter = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        saveDetailManager: (state, action) => {
            state.detailManager = action.payload;
        }
    },
});
