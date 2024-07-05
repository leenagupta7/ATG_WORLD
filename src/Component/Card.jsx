import React, { useState } from 'react';


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

const Card = ({ name, image }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  const firstLetter = name[0].toUpperCase();
  const backgroundColor = getColor(firstLetter);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className="h-12 w-12 rounded-full border flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor }}
          >
            {firstLetter}
          </div>
          <span>{name}</span>
        </div>
        <button
          onClick={handleFollow}
          className={`rounded-full px-4 py-1 ${isFollowed ? 'bg-black text-white' : 'bg-gray-400 text-black'}`}
        >
          {isFollowed ? 'Followed' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default Card;
