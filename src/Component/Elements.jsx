import React, { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
const Elements = () => {
  const [activeTab, setActiveTab] = useState('all'); // State to manage active tab
  const [showPopup, setShowPopup] = useState(false);
  const [formField, setFormField] = useState({
    category: "Article",
    title: "",
    description: "",
    file: null,
  });
  const token = localStorage.getItem('usertoken');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files.length > 0) {
      setFormField({
        ...formField,
        [name]: files[0],
      });
    } else {
      setFormField({
        ...formField,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", formField.category);
    formData.append("title", formField.title);
    formData.append("description", formField.description);
    formData.append("file", formField.file);
    //console.log(formData);
    const Baseurl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.post(
        `${Baseurl}/postblog`,
        formData, {
        headers: {
          'usertoken': token,
        },
      }
      );

    } catch (error) {
      alert('error');
      console.error("Error submitting form:", error);
    }
    setShowPopup(false);
    setFormField({
      category: "Article",
      title: "",
      description: "",
      file: null,
    });
  };

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
      <div className="flex items-center justify-center space-x-4 ">
        <div onClick={() => setShowPopup(true)} className="cursor-pointer flex items-center bg-gray-100 p-2">
          <span className="hidden md:inline">Write a post</span> {/* Hide on mobile */}
          <span className="md:hidden">Post</span> {/* Show on mobile */}
          <ArrowDropDownIcon />
        </div>
        {token === null ? (
          <div className="flex cursor-pointer items-center bg-blue-500 text-white p-2  md:mt-0"> {/* Adjust margin for mobile */}
            <GroupsIcon />
            <span className="hidden md:inline">Join a group</span> {/* Hide on mobile */}
            <span className="md:hidden">Join</span> {/* Show on mobile */}
          </div>
        ) : (
          <div onClick={()=>localStorage.clear()} className="cursor-pointer flex items-center bg-gray-400 text-white p-2  md:mt-0"> {/* Adjust margin for mobile */}
            <GroupsIcon />
            <span className="hidden md:inline">Leave a group</span> {/* Hide on mobile */}
            <span className="md:hidden">Leave</span> {/* Show on mobile */}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="p-12 z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative ">
            <div className="absolute top-2 right-2 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer" onClick={() => setShowPopup(false)}>
              <CloseIcon />
            </div>
            <div className="max-w-100 flex-col space-y-2">
              <select className="border p-2 bg-gray-100 w-full"
                id="category"
                name="category"
                value={formField.category}
                onChange={handleChange}
                required>
                <option value="article">Article</option>
                <option value="event">Event</option>
                <option value="job">Job</option>
                <option value="education">Education</option>
              </select>

              <input
                className="border p-2 bg-gray-100 w-full"
                type="title"
                name="title"
                placeholder="Title"
                value={formField.title}
                onChange={handleChange}
              />
              <textarea
                className="border p-2 bg-gray-100 w-full"
                type="description"
                name="description"
                placeholder="description"
                value={formField.description}
                onChange={handleChange}
              />
              <input
                id="fileInput"
                className=""
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                style={{ color: "white" }} // Set text color to white using inline style
              />
              {formField.file && (
                <img
                  className="formfieldImage"
                  src={URL.createObjectURL(formField.file)}
                  alt="Selected Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <button
                className="flex flex-col item-center justify-center btn bg-blue-500 px-4 text-white hover:bg-blue-600 text-black hover:text-white rounded-3xl border-white"
                type="submit" onClick={handleSubmit}
              >
                <span className="xs:block  text-lg">Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Elements;
