import { memo, MouseEvent } from 'react';
import { Card } from '../Card';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Rating } from '../Rating';

interface ThumbnailMediaProps {
    movieId: number;
    thumbnail: string;
    title?: string;
    rating?: number;
    onFavoriteClick?: (movieId: number, isFavorite: boolean) => void;
    isFavorite?: boolean;
}

const ThumbnailMedia = ({
    movieId,
    thumbnail,
    rating = 0,
    onFavoriteClick,
    isFavorite,
}: ThumbnailMediaProps) => {
    const handleFavoriteClick = async (
        event: MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        onFavoriteClick?.(movieId, !isFavorite);
    };

    return (
        <Card
            noPadding
            className="w-full aspect-auto relative hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            <div className="absolute flex inset-0 bg-gradient-to-b from-black/70 to-black/0">
                <button onClick={handleFavoriteClick}>
                    {isFavorite ? (
                        <HeartIconSolid className="size-7 hover:size-8 absolute right-1 top-1 text-red-600 font-bold z-20 cursor-pointer" />
                    ) : (
                        <HeartIcon className="size-7 hover:size-8 absolute right-1 top-1 text-white font-extrabold z-20 cursor-pointer" />
                    )}
                </button>
            </div>
            <img className="size-full object-cover" src={thumbnail} />
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-md">
                <Rating rating={rating} />
            </div>
        </Card>
    );
};

export default memo(ThumbnailMedia);
