import { createSlice } from "@reduxjs/toolkit";

//init state
const initialState = { //reducer lưu trữ TT
    title: "ENGINE",
    //init list data
    listEngine: [],
    paginationFilter: {
        page: 1,
        size: 10,
        order_by: "modified_time",
        oder: -1,
    },
    pagination: {
        page: 1,
        size: 10,
        totalPage: 0,
        totalItem: 10,
    },

    /** ------- detail ---------- */
    // init details data
    detailsEngine: {
        id: "",
        name: "",
        type: "",
        mode: "",
        actions: "",
        doctypes: [],
        server_ai_id:"",
        server_ai: {},
        ocr_ai_config: {},
        server_cap_id:"",
        server_cap: {},
        ocr_cap_config: {},
        engine_auth_config: {},
        created_by: "",
        created_time: "",
        modified_time: "",
    },

};


//List Engine slice
export const SimpleInputSlice = createSlice({
    name: "SimpleInputSlice",
    initialState: initialState,
    reducers: {
        //load list engine reducer
        loadListEngineReducer: (state, action) => {
            state.listEngine = action.payload;

        },

        //load pagFilter for list engine reducer
        loadListEngineFilterReducer: (state, action) => {
            state.paginationFilter = action.payload;
        },

        //load pagination for list engine reducer
        setPaginationReducer: (state, action) => {
            state.pagination = action.payload
        },


        /** ------- detail ---------- */
        // load detail reducer
        loadDetailEngineReducer: (state,action) => {
            state.detailsEngine= action.payload;
        },

        //set data of engine
        setUpdateDataEngineReducer: (state, action) => {
            state.detailsEngine = action.payload;    
        }
    }
});

