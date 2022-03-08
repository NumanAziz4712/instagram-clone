import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  //   useeffect
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className=' flex justify-between text-sm mb-5 items-center'>
        <h3 className='font-semibold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>

      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className='flex items-center justify-between mt-3 gap-4'
        >
          <img
            src={profile.avatar}
            alt='suggested profiles'
            className='h-10 cursor-pointer w-10 p-[2px] border rounded-full'
          />

          <div className='flex-1'>
            <h2 className='font-semibold cursor-pointer text-sm'>
              {profile.username}
            </h2>
            <h3 className='text-xs text-gray-400'>
              Works at {profile.company.name}{' '}
            </h3>
          </div>
          <button className='text-blue-400 font-semibold text-sm'>
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
