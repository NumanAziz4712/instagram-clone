import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Story from './Story';
import { useSession } from 'next-auth/react';
const Stories = () => {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);

  const userData = {
    avatar: session?.user?.image,
    username: session?.user?.username,
  };
  useEffect(() => {
    //   using the implicit return
    // it returns a value everytime the it maps through the arr
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='flex items-center mt-8 gap-2 bg-white p-6 border-gray-200 border overflow-x-scroll scrollbar-thin  scrollbar-track-red-100 scrollbar-thumb-rose-600 rounded-sm'>
      {session && <Story {...userData} />}

      {suggestions.map((profile) => (
        <Story key={profile.id} {...profile} />
      ))}
    </div>
  );
};

export default Stories;
