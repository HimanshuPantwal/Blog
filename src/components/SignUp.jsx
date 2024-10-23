import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaUserSecret } from "react-icons/fa";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center w-full mx-auto my-8 px-4 lg:px-12">
            {/* Signup Form */}
            <div className="w-full lg:w-1/2 bg-gray-100 rounded-l-xl p-6 lg:p-10 border border-black/10 my-2 h-full lg:h-[570px] lg:rounded-none lg:rounded-l-xl">
                <div className="mb-4 flex justify-center">
                    <FaUserSecret className="text-6xl text-gray-600" />
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
                    <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", { required: true })}
                    />
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
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block w-full lg:w-1/2 h-full lg:h-[570px]">
                <img
                    src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Signup Illustration"
                    className="w-full h-full object-cover rounded-r-xl"
                />
            </div>
        </div>
    );
}

export default Signup;
