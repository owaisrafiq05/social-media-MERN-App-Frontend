import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';
import Cookies from 'js-cookie';

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const creatorID = localStorage.getItem('creatorID');

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`${BASE_URL}/api/post/view`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('Fetched posts response:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    const filteredPosts = response.data.filter(post => post.creator === creatorID);
                    setPosts(filteredPosts);
                } else {
                    setError('Invalid response structure');
                }
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            });
    }, [creatorID]);

    const handleDelete = async (id) => {
        const token = Cookies.get('token');
        try {
            await axios.delete(`${BASE_URL}/api/post/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter(post => post._id !== id));
            alert('Post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!posts.length) {
        return <div>No posts available</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600 p-8">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">Your Posts</h2>
                {posts.map(post => (
                    <div key={post._id} className="border border-gray-300 rounded-lg p-4 mb-4 shadow-lg">
                        <div className="mb-2">
                            {post.images && post.images.length > 0 ? (
                                <img src={post.images[0]} alt="Post" className="w-full rounded-lg" />
                            ) : post.videos && post.videos.length > 0 ? (
                                <video src={post.videos[0]} controls className="w-full rounded-lg" />
                            ) : null}
                        </div>
                        <p className="mb-2 text-gray-700">{post.content}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                                onClick={() => navigate(`/creator/dashboard/view-post/${post._id}`)}
                            >
                                View
                            </button>
                            <button
                                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200"
                                onClick={() => navigate(`/creator/dashboard/edit-post/${post._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                                onClick={() => handleDelete(post._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPosts;
