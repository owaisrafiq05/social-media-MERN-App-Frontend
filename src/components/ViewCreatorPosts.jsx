import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config.js';
import Cookies from 'js-cookie';

const ViewCreatorPosts = () => {
    const { creatorId } = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get(`${BASE_URL}/api/post/view`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Fetched posts response:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    const filteredPosts = response.data.filter(post => post.creator === creatorId);
                    setPosts(filteredPosts);
                } else {
                    setError('Invalid response structure');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            }
        };

        fetchPosts();
    }, [creatorId]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!posts.length) {
        return <div>No posts available for this creator</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-teal-600 p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">Posts by Creator</h2>
                {posts.map(post => (
                    <div key={post._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg">
                        <div className="mb-2">
                            {post.images && post.images.length > 0 ? (
                                post.images.map((image, index) => (
                                    <img key={index} src={image} alt="Post" className="w-full rounded-lg mb-2" />
                                ))
                            ) : post.videos && post.videos.length > 0 ? (
                                post.videos.map((video, index) => (
                                    <video key={index} src={video} controls className="w-full rounded-lg mb-2" />
                                ))
                            ) : null}
                        </div>
                        <p className="mb-2 text-gray-700">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCreatorPosts;
