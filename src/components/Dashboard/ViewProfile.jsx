import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';

const ViewProfile = () => {
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const creatorID = localStorage.getItem('creatorID');
        if (creatorID) {
            axios.get(`${BASE_URL}/api/creator/view/${creatorID}`)
                .then(response => {
                    setCreator(response.data);
                })
                .catch(error => {
                    console.error('Error fetching profile data:', error);
                });
        }
    }, []);

    if (!creator) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 px-4">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div className="flex flex-col md:flex-row items-center">
                    <img
                        src={creator.avatar}
                        alt="Profile"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0 md:mr-4"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-semibold text-gray-900">{creator.username}</h2>
                        <p className="text-gray-700">{creator.description}</p>
                    </div>
                </div>
                <div className="text-center text-gray-600">
                    <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                    <p>Email: {creator.email}</p>
                    <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-4 space-y-2 md:space-y-0 mt-4">
                        {creator.socialLinks.map((link, index) => (
                            <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
