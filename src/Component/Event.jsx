import React from 'react';
import rectangle7 from '../Images/Rectangle7.png';
import jatin from '../Images/jatin.jpeg';
import TodayIcon from '@mui/icons-material/Today';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Event = () => {
  return (
    <div className="max-w-full mx-auto border p-4 flex flex-col space-y-2">
      <div>
        <img className="w-full" src={rectangle7} alt="Article" />
      </div>
      <div className="flex items-center space-x-2"><EditCalendarIcon style={{ color: 'rgb(204, 204, 0)' }} /><span>Meetup</span></div>
      <div className="flex justify-between items-center">
        <span className="font-bold">Lorem ipsum, dolor sit amet consectetur.</span>
        <MoreHorizIcon />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-12">
            <div className="flex items-center space-x-2">
                <TodayIcon/>
                <span>Fri,12 oct,2018</span>
            </div>
            <div className="flex items-center space-x-2">
                <AddLocationIcon/>
                <span>Ahmedabad,India</span>
            </div>
        </div>
        <div className="border flex flex-col items-center rounded">
        <button className="text-red-500 flex items-center">View Website</button>
        </div>
        
      </div>
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

export default Event;
