import React from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Card from './Card';

import array from './UserArray';

const User = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex">
        <AddLocationIcon/>
        <input placeholder='Enter your location'/>
        <CloseIcon/>
      </div>
      <hr/>
      <span className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse earum ducimus vitae numquam ea </span>
      <div className="flex space-x-4">
        <ThumbUpOffAltIcon/>
        <span>RECMMENDED GROUPS</span>
      </div>
      {array.map((item,index)=>(
        <Card key={index} name={item.name} image={item.picture} id={item.id}/>
      ))}
      
    </div>
  )
}

export default User
