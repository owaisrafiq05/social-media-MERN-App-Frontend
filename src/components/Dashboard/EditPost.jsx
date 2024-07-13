import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';
import Cookies from 'js-cookie';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`${BASE_URL}/api/post/view/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const post = response.data;
                setContent(post.content);
                setImages(post.images);
                setVideos(post.videos);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    }, [id]);

    const handleImageChange = (e) => {
        setImages([...images, ...e.target.files]);
    };

    const handleVideoChange = (e) => {
        setVideos([...videos, ...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        images.forEach(image => formData.append('images', image));
        videos.forEach(video => formData.append('videos', video));

        const token = Cookies.get('token');
        try {
            await axios.put(`${BASE_URL}/api/post/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Post updated successfully');
            navigate('/creator/dashboard/view-posts');
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-600">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
                <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-8">Edit Post</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Post Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post content here..."
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                            rows="4"
                        />
                    </div>
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images</label>
                        <input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 mt-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Upload Videos</label>
                        <input
                            id="videos"
                            name="videos"
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={handleVideoChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 mt-2"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-200">
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
