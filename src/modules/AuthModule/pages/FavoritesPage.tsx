import { useSelector } from 'react-redux';

import { skipToken } from '@reduxjs/toolkit/query';
import { ThumbnailMedia } from '../../../ui-elments/components';
import {
    useGetFavoritesQuery,
    useToggleFavoriteMutation,
} from '../../MoviesModule/slices/movieApi';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.user.isAuthenticated
    );

    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetFavoritesQuery(
        isAuthenticated ? undefined : skipToken
    );
    const [toggleFavorite] = useToggleFavoriteMutation();

    if (!isAuthenticated) {
        return (
            <p className="text-white text-center">
                You must be logged in to view favorites.
            </p>
        );
    }

    if (isLoading) {
        return <p className="text-white text-center">Loading favorites...</p>;
    }

    if (isError || !data) {
        return (
            <p className="text-white text-center">Failed to load favorites.</p>
        );
    }

    const handleRemoveFavorite = async (movieId: number) => {
        await toggleFavorite({ movieId, favorite: false });
    };

    return (
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4">
            <h1 className="dark_text text-2xl font-bold">
                My Favorite Movies ❤️
            </h1>
            {data.results.length === 0 ? (
                <p className="text-gray-400">No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
                    {data.results.map((movie) => (
                        <div
                            key={movie.id}
                            className="cursor-pointer"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <ThumbnailMedia
                                isFavorite
                                key={movie.id}
                                movieId={movie.id}
                                thumbnail={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                title={movie.title}
                                rating={movie.vote_average}
                                onFavoriteClick={() =>
                                    handleRemoveFavorite(movie.id)
                                }
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
