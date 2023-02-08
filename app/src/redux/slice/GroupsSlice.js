import { createSlice } from "@reduxjs/toolkit";

// init state
const initialGroupsState = {
    title: "GROUPS",
    /** ------- list ---------- */
    // init list data
    listGroups: [],
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
export const GroupsSlice = createSlice({
    name: "groupsSlice",
    initialState: initialGroupsState,
    reducers: {
        /** ------- list ---------- */
        // load list reducer
        loadListGroupsReducer: (state, action) => {
            state.listGroups = action.payload;
        },
    },
});
