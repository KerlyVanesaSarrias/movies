import { useEffect, useMemo } from 'react';
import { Logo } from '../../../components';
import {
    Button,
    Input,
    Card,
    Text,
    Carousel,
} from '../../../ui-elments/components';
import { CarouselImage } from '../../../ui-elments/components/Carousel/Carousel';
import imageZero from '../../../assets/images/login-zero.jpg';
import imageOne from '../../../assets/images/login-one.jpg';
import imageTwo from '../../../assets/images/login-two.jpg';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../slices/UserSlice/userSlice';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const images = useMemo<CarouselImage[]>(() => {
        return [
            {
                id: 0,
                url: imageZero,
            },
            {
                id: 1,
                url: imageOne,
            },
            {
                id: 2,
                url: imageTwo,
            },
        ];
    }, []);

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
        <div className="relative w-full bg-gray-50 h-screen">
            <div className="flex flex-col p-8 md:px-24 h-full">
                <div className="w-40 brightness-0 mb-4">
                    <Logo />
                </div>
                <Card noPadding className="h-full">
                    <div className="flex flex-col sm:flex-row w-full h-full bg-white">
                        <div className="sm:w-1/2 flex flex-col items-center w-full p-10 justify-center">
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
                                className="flex flex-col gap-5 w-full md:w-[300px]"
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
                        <div className="w-full sm:w-1/2 h-full  bg-slate-900 flex items-center ">
                            <Carousel images={images} enableAutoplay />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
