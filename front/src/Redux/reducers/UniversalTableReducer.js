import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "universalTable",
    initialState: {
        columns: [],
        currentPage:1,
        showHide: false,
        dataState:[],
        sizeOfPage:20,
    },
    reducers: {
        claimData: (state, action) => {
            state.columns = action.payload.columns;
            state.dataState = action.payload.data;
        },
        setShowHide: (state, action) => {
            state.showHide = action.payload
        },
        setHide: (state, action) => {
            // state.columns[action.payload.index].show=action.payload.data
        },
        filterColumns: (state, action) => {
            state.columns.map((item, index) => {
                if (index === action.payload) {
                    item.show = !item.show;
                }
            })
        },
        changeSizeOfPage: (state, action) => {
        },
        changeData: (state, action) => {
            state.data = action.payload.data;
            state.sizeOfPage = action.payload.size;
        },
        handlePageChange: (state, action) => {
            state.currentPage = action.payload;
        },
        changePage: (state, action) => {
            if (
                action.payload.current !== -1 &&
                action.payload.current != action.payload.size
            ) {
                state.currentPage = action.payload.current;
            }
        },
        changeSizeOfPerPage: (state, action) => {
        },
        changeSizeOfPerPageSuccess: (state, action) => {
            state.dataState = action.payload.data;
            state.sizeOfPage = action.payload.size;
            state.currentPage = action.payload.currentPage;
        }
    }
})
export const universalTable = {...slice.actions}
export default slice.reducer
