import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';
import Cookies from 'js-cookie';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`${BASE_URL}/api/post/view/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
                setError('Failed to fetch post');
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Post Details</h2>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={() => navigate('/creator/dashboard/view-posts')}
                    >
                        Back to All Posts
                    </button>
                </div>
                <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg">
                    <div className="mb-2">
                        {post.images && post.images.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Post ${index}`} className="w-full rounded-lg" />
                                ))}
                            </div>
                        )}
                        {post.videos && post.videos.length > 0 && (
                            <div className="mt-4">
                                {post.videos.map((video, index) => (
                                    <video key={index} src={video} controls className="w-full rounded-lg my-2" />
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="mb-2 text-gray-700">{post.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
