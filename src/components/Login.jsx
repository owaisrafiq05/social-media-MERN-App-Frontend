import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(''); // State for error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/creator/login`, formData);
            if (response.data.status) {
                Cookies.set('token', response.data.token);
                localStorage.setItem('creatorID', response.data.data._id); // Save creatorID in localStorage
                navigate('/creator/dashboard');
            } else {
                setError(response.data.message); // Set error message
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600">
            <form className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8" onSubmit={handleSubmit}>
                <h2 className="text-center text-4xl font-extrabold text-gray-900">Login</h2>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="relative">
                    <input
                        placeholder="Email"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="email"
                    >
                        Email address
                    </label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Password"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="password"
                    >
                        Password
                    </label>
                </div>
                <div className="text-center text-gray-600">
                    Not a creator?{' '}
                    <Link to="/creator/signup" className="text-purple-500 hover:underline">
                        Signup
                    </Link>
                </div>
                <button
                    className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
