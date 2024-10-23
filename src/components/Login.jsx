import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        authService.googleLogin();
        navigate('/callback');
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-0 w-full mx-auto my-8 px-4 lg:px-12">
           \
            <div className="w-full lg:w-1/2 bg-gray-100 rounded-l-xl p-6 lg:p-10 border border-black/10 my-2 h-full lg:h-[500px] lg:rounded-none lg:rounded-l-xl rounded-r-xl lg:rounded-r-none">
                <div className="mb-4 flex justify-center">
                    <FaRegUserCircle className="text-6xl text-gray-600" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                    >Sign in</Button>
                </form>
            </div>

            
            <div className="hidden lg:block w-full lg:w-1/2 h-full lg:h-[500px]">
                <img
                    src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Login Illustration"
                    className="w-full h-full object-cover rounded-r-xl"
                />
            </div>
        </div>
    );
}

export default Login;
