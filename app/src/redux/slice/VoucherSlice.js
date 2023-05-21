import { createSlice } from "@reduxjs/toolkit";

// init state
const initialVoucherState = {
    title: "VOUCHER",
    /** ------- list ---------- */
    // init list data
    listVoucher: [],
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
    detailVoucher: {},
    /** ------- detail - end ---------- */
    detailChart : {}
};

// List Project Slice
export const VoucherSlice = createSlice({
    name: "voucherSlice",
    initialState: initialVoucherState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListVoucherReducer: (state, action) => {
            state.listVoucher = action.payload;
        },
        // load paging 
        loadPaginationFilter: (state, action) => {
            state.paginationFilter = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
        saveDetailVoucher: (state, action) => {
            state.detailVoucher = action.payload;
        },
        saveDetailChart: (state, action) => {
            state.detailChart = action.payload;
        }
    },
});
