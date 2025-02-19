import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    selectedGenre: string;
    releaseYear: string;
    rating: string;
}

const initialState: FiltersState = {
    selectedGenre: '',
    releaseYear: '',
    rating: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<string>) => {
            state.selectedGenre = action.payload;
        },
        setReleaseYear: (state, action: PayloadAction<string>) => {
            state.releaseYear = action.payload;
        },
        setRating: (state, action: PayloadAction<string>) => {
            state.rating = action.payload;
        },
        resetFilters: (state) => {
            state.selectedGenre = '';
            state.releaseYear = '';
            state.rating = '';
        },
    },
});

export const { setGenre, setReleaseYear, setRating, resetFilters } =
    filtersSlice.actions;
export default filtersSlice.reducer;
