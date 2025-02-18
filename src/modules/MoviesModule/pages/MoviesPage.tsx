import { memo } from 'react';

import { ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useGetMoviesQuery } from '../slices/movieApi';

const MoviesPage = () => {
    // const dispatch = useDispatch<AppDispatch>();
    const {
        isError,
        isLoading,
        data: movieData,
    } = useGetMoviesQuery({ page: 1 });

    // const user = useSelector((state: RootState) => state.user);

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
