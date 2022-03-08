import React from 'react';

const Story = ({ avatar, username }) => {
  return (
    <div className='cursor-pointer relative'>
      <img
        className='rounded-full h-14 flex-none p-[3px] border-red-500 border-2 hover:scale-110 transition ease-out  transform  object-contain w-14'
        src={avatar}
        alt=''
      />

      <p className='text-xs w-14 truncate'>{username}</p>
    </div>
  );
};

export default Story;
