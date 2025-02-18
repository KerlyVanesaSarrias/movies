import { Outlet } from 'react-router-dom';
import { Header } from '../Components';
import { NavItem } from '../Components/Header/NavHeader';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { MOVIES_PATHS } from '../constants';

const MoviesModuleLayout = () => {
    const navItems = useMemo<NavItem[]>(() => {
        return [
            {
                label: 'Movies',
                path: MOVIES_PATHS.all,
            },
            {
                label: 'Favorites',
                path: MOVIES_PATHS.favorites,
            },
        ];
    }, []);

    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="flex flex-col">
            <Header
                navItems={navItems}
                isAuthenticated={user.isAuthenticated}
                userName={user.user?.name ?? ''}
            />
            <Outlet />
        </div>
    );
};

export default MoviesModuleLayout;
