import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/api/creator/otp-verification`, { email, otp });
            navigate('/creator/login');
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600">
            <form className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8" onSubmit={handleSubmit}>
                <h2 className="text-center text-4xl font-extrabold text-gray-900">OTP Verification</h2>
                <div className="relative">
                    <input
                        placeholder="Email"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="OTP"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="otp"
                        name="otp"
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="otp"
                    >
                        OTP
                    </label>
                </div>
                <button
                    className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default OtpVerification;
