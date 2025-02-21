import { Route, Routes } from 'react-router-dom';
import MoviesModuleLayout from '../layouts/MoviesModuleLayout';
import { MOVIES_PATHS } from '../constants';
import MoviesPage from '../pages/MoviesPage';
import { ProtectedRoute } from '../../../components';
import PageError from '../../../components/PageError/PageError';
import FavoritesPage from '../../AuthModule/pages/FavoritesPage';
import MovieDetail from '../pages/MovieDetailPage';

const MoviesModuleRouter = () => {
    return (
        <Routes>
            <Route path={MOVIES_PATHS.all} element={<MoviesModuleLayout />}>
                <Route index element={<MoviesPage />}></Route>
                <Route
                    path={MOVIES_PATHS.favorites}
                    element={<ProtectedRoute component={<FavoritesPage />} />}
                />
                <Route path={MOVIES_PATHS.detail} element={<MovieDetail />} />

                <Route path="*" element={<PageError />} />
            </Route>
        </Routes>
    );
};

export default MoviesModuleRouter;
