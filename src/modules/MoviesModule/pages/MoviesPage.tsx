import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import {
    setTotalPages,
    nextPage,
    prevPage,
    setCurrentPage,
} from '../slices/paginationSlice';
import { Button, Input, ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMoviesQuery, useGetGenresQuery } from '../slices/movieApi';
import { AppDispatch } from '../../../store';
import { setGenre } from '../slices/filterSlice';
import { RootState } from '../../../store';
import { setQuery } from '../slices/searchSlice';
import Select from '../../../ui-elments/components/Select/Select';

const MoviesPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { currentPage, totalPages } = useSelector(
        (state: RootState) => state.pagination
    );
    const { selectedGenre } = useSelector((state: RootState) => state.filters);
    const { query } = useSelector((state: RootState) => state.search);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const {
        isError,
        isLoading,
        data: movieData,
    } = useGetMoviesQuery({
        page: currentPage,
        search: query,
        genre: selectedGenre,
    });

    const { data: genresData } = useGetGenresQuery();

    // const user = useSelector((state: RootState) => state.user);

    const handleSearchChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setCurrentPage(1));
            setDebouncedQuery(e.target.value);
        },
        [dispatch]
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setQuery(debouncedQuery));
        }, 500);

        return () => clearTimeout(handler);
    }, [debouncedQuery, dispatch]);

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
            <div className="flex justify-between  w-full">
                <div className="flex gap-5 w-1/2 ">
                    <div className="w-full">
                        <Input
                            label="Search"
                            type="text"
                            placeholder="Search for a movie"
                            value={debouncedQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="pt-5">
                        <Select
                            value={selectedGenre}
                            onChange={(e) => dispatch(setGenre(e.target.value))}
                            options={[
                                { value: '', label: 'All Genres' },
                                ...(genresData?.genres.map((genre) => ({
                                    value: genre.id.toString(),
                                    label: genre.name,
                                })) || []),
                            ]}
                        />
                    </div>
                </div>

                <div className="dark_text flex items-center  gap-5">
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
