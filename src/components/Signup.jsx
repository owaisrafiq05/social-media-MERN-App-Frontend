import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        description: '',
        avatar: null,
        socialLinks: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            await axios.post(`${BASE_URL}/api/creator/signup`, data);
            navigate('/creator/otp');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600">
            <form className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8" onSubmit={handleSubmit}>
                <h2 className="text-center text-4xl font-extrabold text-gray-900">Signup</h2>
                <div className="relative">
                    <input
                        placeholder="Username"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="username"
                    >
                        Username
                    </label>
                </div>
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
                <div className="relative">
                    <input
                        placeholder="Description"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="description"
                        name="description"
                        type="text"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="description"
                    >
                        Description
                    </label>
                </div>
                <div className="relative mt-4">
                    <input
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500 mt-4"
                        required
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="avatar"
                    >
                        Avatar
                    </label>
                </div>
                <div className="relative">
                    <input
                        placeholder="Social Links (comma separated)"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="socialLinks"
                        name="socialLinks"
                        type="text"
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="socialLinks"
                    >
                        Social Links (comma separated)
                    </label>
                </div>
                <div className="text-center text-gray-600">
                    Already a creator?{' '}
                    <Link to="/creator/login" className="text-purple-500 hover:underline">
                        Login
                    </Link>
                </div>
                <button
                    className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
