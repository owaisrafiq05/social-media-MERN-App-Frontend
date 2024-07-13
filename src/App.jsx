import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import OtpVerification from './components/OtpVerification';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Post from './components/Dashboard/Post'; // Import the new component
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import UserDashboard from './components/UserDashboard';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/creator/signup" element={<Signup />} />
                    <Route path="/creator/otp" element={<OtpVerification />} />
                    <Route path="/creator/login" element={<Login />} />
                    <Route path="/user/signup" element={<UserSignup />} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/user/dashboard/*" element={<PrivateRoute element={<UserDashboard />} />} />
                    <Route path="/creator/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/creator/dashboard/view-post/:id" element={<Post />} /> {/* Add new route */}
                    <Route path="*" element={<Signup />} /> {/* Redirect to Signup by default */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
