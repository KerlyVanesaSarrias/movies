import { Route, Routes } from 'react-router-dom';
import MoviesModuleLayout from '../layouts/MoviesModuleLayout';
import { MOVIES_PATHS } from '../constants';
import MoviesPage from '../pages/MoviesPage';
import { ProtectedRoute } from '../../../components';
import PageError from '../../../components/PageError/PageError';

const MoviesModuleRouter = () => {
    return (
        <Routes>
            <Route path={MOVIES_PATHS.all} element={<MoviesModuleLayout />}>
                <Route index element={<MoviesPage />} />
                <Route
                    path={`${MOVIES_PATHS.detail}/:movieId`}
                    element={<h1>DetailMoviePage</h1>}
                />
                <Route
                    path={MOVIES_PATHS.favorites}
                    element={
                        <ProtectedRoute component={<h1>Favorites page</h1>} />
                    }
                />
                <Route path="*" element={<PageError />} />
            </Route>
        </Routes>
    );
};

export default MoviesModuleRouter;
