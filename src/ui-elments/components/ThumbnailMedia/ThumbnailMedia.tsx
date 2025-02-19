import { memo, MouseEvent } from 'react';
import { Card } from '../Card';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import Rating from '../Rating/Rating';

interface ThumbnailMediaProps {
    thumbnail: string;
    isFavorite?: boolean;
    onFavoriteClick: (isFavorite: boolean) => void;
    onClick?: () => void;
    title?: string;
    rating?: number;
}

const ThumbnailMedia = ({
    thumbnail,
    isFavorite = false,
    rating = 0,
    onFavoriteClick,
    onClick,
}: ThumbnailMediaProps) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onClick?.();
    };

    return (
        <Card
            noPadding
            className="w-full aspect-auto relative hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            <div
                onClick={handleClick}
                role="button"
                className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/0 "
            >
                {isFavorite ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick(false);
                        }}
                    >
                        <HeartIconSolid className="size-7 hover:size-8 absolute right-1 top-1  text-red-600 font-bold z-20 cursor-pointer" />
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteClick(true);
                        }}
                    >
                        <HeartIcon className="size-7 hover:size-8 absolute right-1 top-1 text-white font-extrabold z-20 cursor-pointer" />
                    </button>
                )}
                <Rating className=" " rating={rating} />
            </div>
            <img className="size-full object-cover" src={thumbnail} />
        </Card>
    );
};

export default memo(ThumbnailMedia);
