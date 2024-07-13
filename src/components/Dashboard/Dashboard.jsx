import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewProfile from './ViewProfile';
import AddPost from './AddPost';
import EditPost from "./EditPost";
import ViewPosts from './ViewPosts';

import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-4">
                <Routes>
                    <Route path="view-profile" element={<ViewProfile />} />
                    <Route path="/edit-post/:id" element={<EditPost />} />
                    <Route path="add-post" element={<AddPost />} />
                    <Route path="view-posts" element={<ViewPosts />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
