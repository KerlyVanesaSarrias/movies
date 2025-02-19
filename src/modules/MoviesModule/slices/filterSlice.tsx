import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    selectedGenre: string;
}

const initialState: FiltersState = {
    selectedGenre: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<string>) => {
            state.selectedGenre = action.payload;
        },
    },
});

export const { setGenre } = filtersSlice.actions;
export default filtersSlice.reducer;
