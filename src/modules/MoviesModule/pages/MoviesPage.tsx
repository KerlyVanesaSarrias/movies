import { memo, useEffect } from 'react';
import { setTotalPages, nextPage, prevPage } from '../slices/paginationSlice';
import { Button, Input, ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useGetMoviesQuery } from '../slices/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store';

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { currentPage, totalPages } = useSelector(
        (state: RootState) => state.pagination
    );

    const {
        isError,
        isLoading,
        data: movieData,
    } = useGetMoviesQuery({ page: currentPage });

    // const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (movieData?.total_pages) {
            dispatch(setTotalPages(movieData.total_pages));
        }
    }, [movieData, dispatch]);

    if (isLoading) {
        return (
            <div className="w-full flex item-center justify-center pt-24">
                <div className="w-28 h-20 relative">
                    <Loader />
                </div>
            </div>
        );
    }

    if (isError) {
        return <h1>Error: loading movies</h1>;
    }

    return (
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4">
            <div className="flex">
                <div className="w-1/2">
                    <Input
                        label="Search"
                        type="search"
                        placeholder="Search for a movie"
                    />
                </div>
                <div className="text-white w-1/2 flex items-center justify-end gap-5">
                    <Button
                        color="secondary"
                        label="Previous"
                        onClick={() => dispatch(prevPage())}
                        disabled={currentPage === 1}
                    />
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <Button
                        color="secondary"
                        label="Next"
                        onClick={() => dispatch(nextPage())}
                        disabled={currentPage >= totalPages}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
                {movieData?.results.map((item) => {
                    const { poster_path, id, title } = item;
                    // const isFavorite = user.myFavoritesMedia.some(
                    //     (item) => item.id === id
                    // );

                    return (
                        <ThumbnailMedia
                            key={id}
                            thumbnail={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            onFavoriteClick={() => alert('favotire')}
                            isFavorite={false}
                            title={title}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(MoviesPage);
