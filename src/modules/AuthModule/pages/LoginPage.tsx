import { useEffect } from 'react';
import { Logo } from '../../../components';
import { Button, Input, Card, Text } from '../../../ui-elments/components';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../slices/UserSlice/userSlice';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './LoginPage.tailwind.css';

const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const login = async (data: FieldValues) => {
        const result = await dispatch(
            fetchLogin({ email: data.email, password: data.password })
        ).unwrap();

        if (result.success) {
            toast.success('Login successful', {
                closeButton: true,
                position: 'top-right',
            });
            navigate('/');
        } else {
            toast.error(user.error, {
                closeButton: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (user.isAuthenticated) {
            navigate('/');
        }
    }, [navigate, user.isAuthenticated]);

    return (
        <div className="relative login-bg">
            <div className="flex bg-gradient-to-b from-black/70 to-black/0 flex-col p-8 md:px-24 h-full">
                <div className="w-32 mb-4">
                    <Logo />
                </div>
                <div className="flex items-center w-full justify-center">
                    <Card className="bg-[rgba(0,0,0,0.7)] w-full sm:w-3/4 md:max-w-96">
                        <div className=" flex flex-col p-8 justify-center items-center">
                            <Text
                                as="h1"
                                size={'lg'}
                                weight="medium"
                                className="mb-4"
                            >
                                Log In
                            </Text>
                            <form
                                onSubmit={handleSubmit(login)}
                                className="flex flex-col gap-8 w-full md:w-[300px]"
                            >
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                    errorMessage={
                                        errors?.email?.message &&
                                        typeof errors.email.message === 'string'
                                            ? errors.email.message
                                            : undefined
                                    }
                                    type="email"
                                    placeholder="Email"
                                    label="Email"
                                />
                                <Input
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                    errorMessage={
                                        errors?.password?.message &&
                                        typeof errors.password.message ===
                                            'string'
                                            ? errors.password.message
                                            : undefined
                                    }
                                    type="password"
                                    placeholder="Password"
                                    label="Password"
                                />
                                <Button
                                    type="submit"
                                    label="Log In"
                                    color="primary"
                                    size="medium"
                                    isLoading={user.isLoading}
                                    isFullWidth={true}
                                />
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
