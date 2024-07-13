import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const ViewUserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            axios.get(`${BASE_URL}/api/user/view/${userID}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    setError('Failed to fetch user data');
                });
        } else {
            setError('User ID not found in local storage');
        }
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600 p-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">User Profile</h2>
                <div className="flex items-center space-x-4 p-2 mb-5">
                    <div>
                        <h4 className="font-semibold text-lg">{user.name}</h4>
                        <span className="text-sm opacity-75">{user.email}</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-700">Welcome, {user.name}!</p>
                    <p className="text-gray-700">Email: {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewUserProfile;
