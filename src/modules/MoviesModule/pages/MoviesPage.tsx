import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { memo, useEffect } from 'react';
import {
    fetchGallery,
    galleryActions,
    MediaItem,
} from '../slices/GalerySlice/gallerySlice';
import { ThumbnailMedia } from '../../../ui-elments/components';
import { Loader } from '../../../assets/images/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userActions } from '../../AuthModule/slices/UserSlice/userSlice';

const MoviesPage = () => {
    const category = 'all';
    const { pathname } = useLocation();

    const { error, isLoading, media, selectedMedia } = useSelector(
        (state: RootState) => state.gallery
    );

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleCheckboxChange =
        (mediaItem: MediaItem) => (isChecked: boolean) => {
            dispatch(
                galleryActions.toggleMediaSelection({
                    isChecked,
                    media: mediaItem,
                })
            );
        };

    const handleFavoriteClick = (item: MediaItem) => (isFavorite: boolean) => {
        if (!user.isAuthenticated) {
            toast.warning('You must be login to add to favorites');
            navigate('/login');
            return;
        }
        dispatch(userActions.setFavoritesMedia({ isFavorite, media: item }));
    };

    useEffect(() => {
        dispatch(fetchGallery(category));
    }, [category, dispatch]);

    useEffect(() => {
        if (pathname) dispatch(galleryActions.clearSelectedMedia());
    }, [dispatch, pathname]);

    if (isLoading) {
        return (
            <div className="w-full flex item-center justify-center pt-24">
                <div className="w-28 h-20 relative">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="w-full h-full flex flex-col py-8 px-8 sm:px-14 md:px-16 gap-4">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 bg-gray-50">
                {media.map((item) => {
                    const { thumbnail, type, id } = item;
                    const isFavorite = user.myFavoritesMedia.some(
                        (item) => item.id === id
                    );

                    const isChecked = selectedMedia.some(
                        (item) => item.id === id
                    );

                    return (
                        <ThumbnailMedia
                            key={id}
                            thumbnail={thumbnail}
                            type={type}
                            onFavoriteClick={handleFavoriteClick(item)}
                            onCheckboxChange={handleCheckboxChange(item)}
                            isFavorite={isFavorite}
                            isChecked={isChecked}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default memo(MoviesPage);
