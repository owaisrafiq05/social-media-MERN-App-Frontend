import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import ProfilePic from "/img/profile.jpg";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";
import { FaUserEdit } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '../../../config.js';
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/creator/login');
  };

  useEffect(() => {
    const creatorID = localStorage.getItem('creatorID');
    console.log('Fetched creatorID from localStorage:', creatorID); // Debug log for creatorID

    if (creatorID) {
      axios.get(`${BASE_URL}/api/creator/view/${creatorID}`)
        .then(response => {
          console.log('Fetched creator data:', response.data); 
          setCreator(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  return (
    <div className="md:flex md:flex-col md:w-64 bg-purple-700 text-white mt-4 ml-4 p-4 rounded-lg shadow-md sidebar-separation min-h-screen">
      {/* Mobile and Tablet Sidebar Toggle Button */}
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'} md:flex md:flex-col md:w-full`}>
        <div className="flex flex-row items-center justify-left">
          {creator ? (
            <>
              <img
                src={creator.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className='flex flex-col items-left gap-y-0 justify-left ml-4'> 
                <h2 className="text-md font-semibold plus-jakarta-sans">{creator.username}</h2>
                <p className="text-sm text-gray-200">{creator.description}</p>
              </div>
            </>
          ) : (
            <p>Loading...</p> // Display a loading message if creator data is not yet available
          )}
        </div>
        <div className="mt-4">
          <ul className='sidebar-content'>
            <li className='mt-4'>
              <NavLink
                to="/creator/dashboard/view-profile"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 bg-purple-800 rounded cursor-pointer'
                    : 'flex items-center p-3 hover:bg-purple-600 rounded cursor-pointer'
                }
              >
                <LuLayoutDashboard className="mr-2" />
                <span className="plus-jakarta-sans" style={{ fontSize: ".9rem" }}>
                  View Profile
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/creator/dashboard/add-post"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 bg-purple-800 rounded cursor-pointer'
                    : 'flex items-center p-3 hover:bg-purple-600 rounded cursor-pointer'
                }
              >
                <FaUserEdit className="mr-2" />
                <span className="plus-jakarta-sans" style={{ fontSize: ".9rem" }}>
                  Add Post
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/creator/dashboard/view-posts"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center p-3 bg-purple-800 rounded cursor-pointer'
                    : 'flex items-center p-3 hover:bg-purple-600 rounded cursor-pointer'
                }
              >
                <SiGoogledocs className="mr-2" />
                <span className="plus-jakarta-sans" style={{ fontSize: ".9rem" }}>
                  View Posts
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logout-button p-3 hover:bg-grey-600 mt-8 rounded cursor-pointer" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
