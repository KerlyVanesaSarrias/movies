import { MediaItem } from '../../MoviesModule/slices/GalerySlice/gallerySlice';
import { User } from '../slices/UserSlice/userSlice';

export const USER_KEY = 'user';
export const FAVORITIES_KEY = 'favorites';
export const setUserAuthenticatedLS = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserAuthenticatedLS = (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const clearUserAuthenticatedLS = () => {
    localStorage.removeItem(USER_KEY);
};

export const setFavoritesLS = (media: MediaItem[]) => {
    localStorage.setItem(FAVORITIES_KEY, JSON.stringify(media));
};

export const getFavotiresLS = () => {
    const media = localStorage.getItem(FAVORITIES_KEY);
    return media ? JSON.parse(media) : [];
};

export const clearFavoritesLS = () => {
    localStorage.removeItem(FAVORITIES_KEY);
};
