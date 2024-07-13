import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import Cookies from 'js-cookie';

const ViewCreators = () => {
    const [creators, setCreators] = useState([]);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userID');

    useEffect(() => {
        axios.get(`${BASE_URL}/api/creator/view`)
            .then(response => {
                setCreators(response.data);
            })
            .catch(error => {
                console.error('Error fetching creators:', error);
                setError('Failed to fetch creators');
            });
    }, []);

    const handleSubscribe = async (creatorId) => {
        const token = Cookies.get('token');
        try {
            await axios.post(`${BASE_URL}/api/user/subscribe`, { userId, creatorId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Subscribed successfully');
        } catch (error) {
            console.error('Error subscribing to creator:', error);
            alert('Failed to subscribe');
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600 p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">All Creators</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {creators.map(creator => (
                        <div key={creator._id} className="border border-gray-300 rounded-lg p-4 shadow-lg">
                            <img src={creator.avatar} alt={creator.username} className="w-full h-32 object-cover rounded-lg mb-2" />
                            <h3 className="text-lg font-semibold">{creator.username}</h3>
                            <p className="text-gray-700">{creator.description}</p>
                            <button
                                className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
                                onClick={() => handleSubscribe(creator._id)}
                            >
                                Subscribe
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewCreators;
