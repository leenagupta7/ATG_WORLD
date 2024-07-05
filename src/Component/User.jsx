import React, { useEffect, useState } from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Card from './Card';
import axios from 'axios';

const User = () => {
  const [array, setArray] = useState([]);
  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const fetchData = async () => {
    const token = localStorage.getItem('usertoken');
    try {
      const response = await axios.get(`${Baseurl}/getUser`, {
        headers: {
          'usertoken': token
        }
      });
      //console.log(response.data);
      setArray(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex">
        <AddLocationIcon />
        <input placeholder='Enter your location' />
        <CloseIcon />
      </div>
      <hr />
      <span className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse earum ducimus vitae numquam ea
      </span>
      <div className="flex space-x-4">
        <ThumbUpOffAltIcon />
        <span>RECOMMENDED GROUPS</span>
      </div>
      {array.length > 0 ? (
        array.map((item, index) => (
          <Card key={item._id} name={item.name} image={item.picture ? item.picture : ''} id={item._id} />
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default User;
