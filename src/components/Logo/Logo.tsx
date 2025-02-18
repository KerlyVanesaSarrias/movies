import { useCallback } from 'react';
import LogoIMG from '../../assets/images/gallery-logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex sm:h-full sm:w-full w-3/4 h-3/4">
            <img
                src={LogoIMG}
                alt="Gallery logo"
                onClick={handleClick}
                role="button"
            />
        </div>
    );
};

export default Logo;
