import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthModuleRouter from '../modules/AuthModule/router/AuthModuleRouter';
import PageError from '../components/PageError/PageError';
import MoviesModuleRouter from '../modules/MoviesModule/router/MoviesModuleRouter';
import MovieDetail from '../modules/MoviesModule/pages/MovieDetailPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MoviesModuleRouter />} />
                <Route path="/login/*" element={<AuthModuleRouter />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="*" element={<PageError />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
