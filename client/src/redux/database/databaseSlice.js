import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    loading: false,
    databaseUrl: null,
    currentItems: null,
    search: null,
    currentPage: 1,
    total: null,
}

const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadingSuccess: (state) => {
			state.loading = false;
			state.error = null;
        },
		loadingFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
        connectionSuccess: (state, action) => {
            state.databaseUrl = action.payload;
			state.loading = false;
			state.error = null;
        },
        breakConnection: (state) => {
            state.databaseUrl = null;
            state.currentItems = null;
            state.loading = false;
            state.error = null;
            state.currentPage = 1;
		},
        getItemsSuccess: (state, action) => {
            state.currentItems = action.payload;
			state.loading = false;
			state.error = null;
        },
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        changeTotal: (state, action) => {
            state.total = action.payload;
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        }
    },
});

export const { 
    loadingStart, 
    loadingSuccess, 
    loadingFailure, 
    connectionSuccess, 
    getItemsSuccess, 
    breakConnection, 
    changeCurrentPage, 
    changeTotal, 
    changeSearch,
} = databaseSlice.actions;

export default databaseSlice.reducer;