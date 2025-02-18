import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const AuthModuleRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
};

export default AuthModuleRouter;
