import { configureStore } from '@reduxjs/toolkit';
import { galleryReducer } from '../modules/MoviesModule/slices/GalerySlice/gallerySlice';
import { userReducer } from '../modules/AuthModule/slices/UserSlice/userSlice';
import { moviesApi } from '../modules/MoviesModule/slices/movieApi';

const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        gallery: galleryReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
