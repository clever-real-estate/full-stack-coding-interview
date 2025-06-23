import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { AppDispatch, RootState } from '../store';
import { login, logout } from '../store/authSlice';

import Logo from '../assets/logo.svg';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await dispatch(login({ username, password }));
        if (login.fulfilled.match(res)) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <form onSubmit={handleSubmit} className="w-[319px] h-[395px] p-6 flex flex-col">
                <div className="mb-4">
                    <img src={Logo} alt="Logo" className="h-[75px] w-[75px] mx-auto" />
                </div>
                <h2 className="text-center text-xl font-bold text-customBlack mb-6">
                    Sign in to your account
                </h2>
                <label className="text-sm font-bold text-customBlack mb-1" htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-2 px-3 py-2 border rounded-md border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-customBlue"
                />
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-bold text-customBlack" htmlFor="password">Password</label>
                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                </div>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 px-3 py-2 border rounded-md border-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-customBlue"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-customBlue mt-4 text-white py-3 text-base font-bold cursor-pointer rounded-md hover:bg-[#0075FF] disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default Login;
