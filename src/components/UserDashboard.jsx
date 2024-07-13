import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ViewUserProfile from './ViewUserProfile';
import ViewCreators from './ViewCreators';
import MySubscriptions from './MySubscriptions';
import ViewCreatorPosts from './ViewCreatorPosts'; // Import the new component

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('userID');
        navigate('/user/login');
    };

    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-teal-700 text-white flex flex-col min-h-screen p-4">
                <div className="flex items-center space-x-4 p-2 mb-5">
                    <div>
                        <h4 className="font-semibold text-lg">User Name</h4>
                        <span className="text-sm opacity-75">useremail@example.com</span>
                    </div>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 bg-teal-800 rounded'
                                        : 'flex items-center p-2 hover:bg-teal-600 rounded'
                                }
                            >
                                View Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="posts"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 bg-teal-800 rounded'
                                        : 'flex items-center p-2 hover:bg-teal-600 rounded'
                                }
                            >
                                View Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="creators"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 bg-teal-800 rounded'
                                        : 'flex items-center p-2 hover:bg-teal-600 rounded'
                                }
                            >
                                View Creators
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="subscriptions"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center p-2 bg-teal-800 rounded'
                                        : 'flex items-center p-2 hover:bg-teal-600 rounded'
                                }
                            >
                                My Subscriptions
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-auto p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                >
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-8">
                <Routes>
                    <Route path="profile" element={<ViewUserProfile />} />
                    <Route path="creators" element={<ViewCreators />} />
                    <Route path="subscriptions" element={<MySubscriptions />} />
                    <Route path="view-creator-posts/:creatorId" element={<ViewCreatorPosts />} /> {/* Add new route */}
                </Routes>
            </main>
        </div>
    );
};

export default UserDashboard;
