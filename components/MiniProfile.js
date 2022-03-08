import React from 'react';
import { useSession, signOut } from 'next-auth/react';
const MiniProfile = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='mt-14 ml-10 flex space-x-4  items-center'>
      <img
        src={session?.user?.image}
        className='rounded-full border w-16 h-16 p-[2px]'
        alt=''
      />
      <div className='flex-1'>
        <h2 className='font-bold'>{session?.user.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
      </div>
      <button className='text-blue-400 text-sm font-semibold' onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
