import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
    component: ReactNode | JSX.Element;
}
const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuthenticated) {
            toast.warning('You need login to view this page');
            navigate('/login');
        }
    }, [navigate, user.isAuthenticated]);

    return component;
};

export default ProtectedRoute;
