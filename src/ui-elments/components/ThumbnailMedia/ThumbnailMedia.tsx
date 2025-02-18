import { ChangeEvent, memo, MouseEvent } from 'react';
import { Card } from '../Card';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Checkbox } from '../Checkbox';
import { PlayCircleIcon } from '@heroicons/react/16/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface ThumbnailMediaProps {
    thumbnail: string;
    type: 'image' | 'video';
    isFavorite?: boolean;
    onFavoriteClick: (isFavorite: boolean) => void;
    onClick?: () => void;
    onCheckboxChange: (isChecked: boolean) => void;
    isChecked?: boolean;
}

const ThumbnailMedia = ({
    thumbnail,
    type,
    isFavorite = false,
    isChecked,
    onFavoriteClick,
    onClick,
    onCheckboxChange,
}: ThumbnailMediaProps) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onClick?.();
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(event.target.checked);
    };

    return (
        <Card noPadding className="w-full aspect-video relative">
            <div
                onClick={handleClick}
                role="button"
                className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-25 transition-opacity duration-300 cursor-pointer"
            >
                <Checkbox
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="top-2 w-4 h-4 cursor-pointer left-2 absolute z-20 shadow-sm shadow-black"
                />
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
                {type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <PlayCircleIcon className="size-10 cursor-pointer text-white opacity-60 hover:opacity-100" />
                    </div>
                )}
            </div>
            <img className="size-full object-cover" src={thumbnail} />
        </Card>
    );
};

export default memo(ThumbnailMedia);
