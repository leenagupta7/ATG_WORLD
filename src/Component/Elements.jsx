import React, { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Elements = () => {
  const [activeTab, setActiveTab] = useState('all'); // State to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const userDetails = localStorage.getItem('userDetails'); // Get user details from localStorage

  return (
    <div className="flex justify-between items-center">
      {/* Desktop view tabs */}
      <div className="hidden lg:flex space-x-12 text-gray-500">
        <span
          className={`cursor-pointer ${activeTab === 'all' ? 'border-b-2 border-black text-black' : ''}`}
          onClick={() => handleTabClick('all')}
        >
          All Posts (32)
        </span>
        <span
          className={`cursor-pointer ${activeTab === 'article' ? 'border-b-2 border-black text-black' : ''}`}
          onClick={() => handleTabClick('article')}
        >
          Article
        </span>
        <span
          className={`cursor-pointer ${activeTab === 'event' ? 'border-b-2 border-black text-black' : ''}`}
          onClick={() => handleTabClick('event')}
        >
          Event
        </span>
        <span
          className={`cursor-pointer ${activeTab === 'job' ? 'border-b-2 border-black text-black' : ''}`}
          onClick={() => handleTabClick('job')}
        >
          Job
        </span>
        <span
          className={`cursor-pointer ${activeTab === 'education' ? 'border-b-2 border-black text-black' : ''}`}
          onClick={() => handleTabClick('education')}
        >
          Education
        </span>
      </div>

      {/* Mobile view selector */}
      <div className="lg:hidden flex items-center space-x-4">
        <select className="bg-gray-100 p-2">
          <option value="all">All Posts (32)</option>
          <option value="article">Article</option>
          <option value="event">Event</option>
          <option value="job">Job</option>
          <option value="education">Education</option>
        </select>
      </div>

      {/* Write a post and join/leave group section */}
      <div className="hidden md:flex flex items-center space-x-4">
        <div className="flex items-center bg-gray-100 p-2">
          <span>Write a post</span>
          <ArrowDropDownIcon />
        </div>
        {userDetails===null ? (
          <div className="flex cursor-pointer items-center bg-blue-500 text-white p-2" onClick={()=>alert('signin first')}>
            <GroupsIcon />
            <span>Join a group</span>
          </div>
        ) : (
          <div className=" cursor-pointer flex items-center bg-gray-400 text-white p-2" onClick={()=>localStorage.removeItem('userDetails')}>
            <GroupsIcon />
            <span>Leave a group</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Elements;
