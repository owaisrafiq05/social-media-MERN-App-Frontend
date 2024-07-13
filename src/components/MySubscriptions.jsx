import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import Cookies from 'js-cookie';

const MySubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                const userResponse = await axios.get(`${BASE_URL}/api/user/view/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { subscriptions } = userResponse.data;
                const creatorPromises = subscriptions.map(creatorId => 
                    axios.get(`${BASE_URL}/api/creator/view/${creatorId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );
                const creatorResponses = await Promise.all(creatorPromises);
                const creators = creatorResponses.map(response => response.data);
                setSubscriptions(creators);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
                setError('Failed to fetch subscriptions');
            }
        };

        fetchUserData();
    }, [userId]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!subscriptions.length) {
        return <div>No subscriptions available</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600 p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">My Subscriptions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {subscriptions.map(creator => (
                        <div key={creator._id} className="border border-gray-300 rounded-lg p-4 shadow-lg">
                            <img src={creator.avatar} alt={creator.username} className="w-full h-32 object-cover rounded-lg mb-2" />
                            <h3 className="text-lg font-semibold">{creator.username}</h3>
                            <p className="text-gray-700">{creator.description}</p>
                            <Link 
                                to={`/user/dashboard/view-creator-posts/${creator._id}`} 
                                className="mt-2 inline-block bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-200"
                            >
                                View Posts
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MySubscriptions;
