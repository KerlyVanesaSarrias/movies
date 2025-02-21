import { User } from '../slices/UserSlice/userSlice';

export const USER_KEY = 'user';
export const FAVORITES_KEY = 'favorites';
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

export const setFavoritesLS = (favorites: number[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const getFavoritesLS = (): number[] => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};
