import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../modules/AuthModule/slices/UserSlice/userSlice';
import { moviesApi } from '../modules/MoviesModule/slices/movieApi';
import paginationReducer from '../modules/MoviesModule/slices/paginationSlice';
import searchReducer from '../modules/MoviesModule/slices/searchSlice';
import filtersReducer from '../modules/MoviesModule/slices/filterSlice';
const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        user: userReducer,
        pagination: paginationReducer,
        search: searchReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
