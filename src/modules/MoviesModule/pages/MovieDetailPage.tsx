import { useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from '../slices/movieApi';
import { Loader } from '../../../assets/images/Loader';

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: movie,
        isLoading,
        isError,
    } = useGetMovieDetailQuery(Number(id));

    if (isLoading) {
        return (
            <div className="w-full flex item-center justify-center pt-24">
                <div className="w-28 h-20 relative">
                    <Loader />
                </div>
            </div>
        );
    }

    if (isError || !movie) {
        return (
            <h1 className="text-white text-center">Error: Movie not found</h1>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 dark_text py-10">
            <div className="max-w-4xl">
                <img
                    className="rounded-lg w-full"
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={movie.title}
                />
                <h1 className="text-3xl font-bold mt-5">{movie.title}</h1>
                <p className="mt-2 text-gray-400">{movie.release_date}</p>
                <p className="mt-4">{movie.overview}</p>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Genres:</h3>
                    <ul className="flex gap-2 mt-2">
                        {movie.genres.map(
                            (genre: { id: number; name: string }) => (
                                <span
                                    key={genre.id}
                                    className="px-2 py-1 bg-blue-600 rounded-lg"
                                >
                                    {genre.name}
                                </span>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
