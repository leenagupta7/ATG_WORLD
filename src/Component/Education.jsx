import React from 'react';
import rectangle6 from '../Images/Rectangle6.png';
import jatin from '../Images/jatin.jpeg';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';

const Education = () => {
  return (
    <div className="max-w-full mx-auto border p-4 flex flex-col space-y-2">
      <div>
        <img className="w-full" src={rectangle6} alt="Education" />
      </div>
      <div className="flex items-center space-x-2">
      <BorderColorIcon style={{ color: 'rgb(204, 204, 0)' }} />
      <span>Education</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">Lorem ipsum, dolor sit amet consectetur.</span>
        <MoreHorizIcon />
      </div>
      <span className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ratione ducimus velit!
      </span>
      <div className="flex justify-between">
        <div className="flex items-center space-x-4">
          <img className="h-12 w-12 rounded-full" src={jatin} alt="Author" />
          <span>Sarthak Kamra</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500 space-x-2">
            <VisibilityIcon />
            <span>1.4k views</span>
          </div>
          <div className="bg-gray-100 rounded-full p-1">
            <ShareIcon style={{ color: 'gray' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
