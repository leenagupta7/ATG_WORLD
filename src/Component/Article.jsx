import React, { useState } from 'react';
import rectangle5 from '../Images/Rectangle5.png';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from './Comment';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
const Article = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formField, setFormField] = useState({
    category: `${props.item.category}`,
    title: `${props.item.title}`,
    description: `${props.item.
      description}`,
    file: `${props.item.image}`,
  });
  const HandleEdit = () => {

    setShowPopup(true);

  }
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
  const userId = localStorage.getItem('userDetail');
  const getColor = (letter) => {
    const colors = {
      A: '#6B7280', B: '#4B5563', C: '#9CA3AF', D: '#6D28D9', E: '#4C1D95',
      F: '#1D4ED8', G: '#2563EB', H: '#1E40AF', I: '#2563EB', J: '#312E81',
      K: '#4B5563', L: '#6B7280', M: '#9CA3AF', N: '#6D28D9', O: '#4C1D95',
      P: '#1D4ED8', Q: '#2563EB', R: '#1E40AF', S: '#2563EB', T: '#312E81',
      U: '#4B5563', V: '#6B7280', W: '#9CA3AF', X: '#6D28D9', Y: '#4C1D95', Z: '#1D4ED8'
    };
    return colors[letter.toUpperCase()] || '#6B7280'; // Default medium gray color if no match found
  };

  const firstLetter = props.item.userId.name[0].toUpperCase();
  const backgroundColor = getColor(firstLetter);
  //console.log(props);
  return (
    <div className="max-w-full mx-auto border p-4 flex flex-col space-y-2">
      <div>
        <img className="w-full" src={props.item.image} alt="Article" />
      </div>
      <div className="flex items-center space-x-2">
        <BorderColorIcon style={{ color: 'rgb(204, 204, 0)' }} />
        <span>Article</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">{props.item.title}</span>
        <MoreHorizIcon />
      </div>
      <span className="text-gray-700">
        {props.item.description}
      </span>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <div
            className="h-12 w-12 rounded-full border flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor }}
          >
            {firstLetter}
          </div>
          <span>{props.item.userId.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500 space-x-2">
            {props.item && props.item.like && props.item.like.includes(userId) ?
              (<ThumbUpIcon className="text-blue-400 cursor-pointer ml-4 mr-2" onClick={() => props.handleunlike(props.item._id)} />)
              : (<ThumbUpOffAltIcon className="text-gray-500 cursor-pointer ml-4 mr-2" onClick={() => props.handlelike(props.item._id)} />)}


            <span>{props.item.like.length} like</span>
          </div>

          {userId === props.item.userId._id && (<div className="bg-gray-100 rounded-full p-1 space-x-4">
            <EditIcon onClick={HandleEdit} style={{ color: 'gray' }} />
            < DeleteIcon onClick={() => props.handleDelete(props.item._id)} style={{ color: 'gray' }} />
          </div>)}
        </div>
      </div>
      <Comment blogId={props.item._id} />
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
                  src={typeof formField.file === 'string' ? formField.file : URL.createObjectURL(formField.file)}
                  alt="Selected Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
              <button
                className="flex flex-col item-center justify-center btn bg-blue-500 px-4 text-white hover:bg-blue-600 text-black hover:text-white rounded-3xl border-white"
                onClick={() => props.handleUpdate(formField.category, formField.title, formField.description, formField.file, props.item._id,setShowPopup)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
