import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const UserSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

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
            await axios.post(`${BASE_URL}/api/user/signup`, formData);
            navigate('/user/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600">
            <form className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8" onSubmit={handleSubmit}>
                <h2 className="text-center text-4xl font-extrabold text-gray-900">User Signup</h2>
                <div className="relative">
                    <input
                        placeholder="Name"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500"
                        required
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-teal-500 peer-focus:text-sm"
                        htmlFor="name"
                    >
                        Name
                    </label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Email"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500"
                        required
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-teal-500 peer-focus:text-sm"
                        htmlFor="email"
                    >
                        Email address
                    </label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Password"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-500"
                        required
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-teal-500 peer-focus:text-sm"
                        htmlFor="password"
                    >
                        Password
                    </label>
                </div>
                <div className="text-center text-gray-600">
                    Already a user?{' '}
                    <Link to="/user/login" className="text-teal-500 hover:underline">
                        Login
                    </Link>
                </div>
                <button
                    className="w-full py-2 px-4 bg-teal-500 hover:bg-teal-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default UserSignup;
