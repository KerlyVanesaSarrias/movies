import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
    rating: number;
    maxStars?: number;
    className?: string;
}

const Rating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
    const normalizedRating = (rating / 10) * maxStars;
    const fullStars = Math.floor(normalizedRating);

    return (
        <div className="flex text-yellow-400">
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} />
            ))}
            {[...Array(maxStars - fullStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} />
            ))}
        </div>
    );
};

export default Rating;
