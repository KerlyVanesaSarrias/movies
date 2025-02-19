import { memo, MouseEvent } from 'react';
import { Card } from '../Card';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { PlayCircleIcon } from '@heroicons/react/16/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Text } from '../Text';

interface ThumbnailMediaProps {
    thumbnail: string;
    isFavorite?: boolean;
    onFavoriteClick: (isFavorite: boolean) => void;
    onClick?: () => void;
    title?: string;
}

const ThumbnailMedia = ({
    thumbnail,
    isFavorite = false,
    onFavoriteClick,
    onClick,
    title,
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
                className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/0"
            >
                <Text className="top-2 w-[70%] md:w-[80%] h-4 left-2 absolute z-20">
                    {title}
                </Text>
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

                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <PlayCircleIcon className="size-10 cursor-pointer text-white opacity-60 hover:opacity-100" />
                </div>
            </div>
            <img className="size-full object-cover" src={thumbnail} />
        </Card>
    );
};

export default memo(ThumbnailMedia);
