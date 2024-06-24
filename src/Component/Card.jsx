import React, { useState } from 'react';

const Card = ({ name, image }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img className="h-12 w-12 rounded-full" src={image} alt={`${name}'s avatar`} />
          <span>{name}</span>
        </div>
        <button
          onClick={handleFollow}
          className={`rounded-full px-4 py-1 ${isFollowed ? 'bg-black text-white':'bg-gray-400 text-black' }`}
        >
          {isFollowed ? 'Followed' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default Card;
