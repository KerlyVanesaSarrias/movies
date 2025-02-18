import { configureStore } from '@reduxjs/toolkit';
import { galleryReducer } from '../modules/MoviesModule/slices/GalerySlice/gallerySlice';
import { userReducer } from '../modules/AuthModule/slices/UserSlice/userSlice';

const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
