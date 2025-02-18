import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
    currentPage: number;
    totalPages: number;
}

const initialState: PaginationState = {
    currentPage: 1,
    totalPages: 1,
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        nextPage: (state) => {
            if (state.currentPage < state.totalPages) {
                state.currentPage += 1;
            }
        },
        prevPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
            }
        },
    },
});

export const { setTotalPages, nextPage, prevPage } = paginationSlice.actions;
export default paginationSlice.reducer;
