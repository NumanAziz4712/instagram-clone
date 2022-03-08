import Image from 'next/image';
import React from 'react';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGropIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  PaperClipIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import { HomeIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // recoil state
  const [open, setOpen] = useRecoilState(modalState);

  // console.log(session.user.image);
  return (
    <div className='border-b bg-white z-50 border-gray-900/5 sticky top-0 shadow-sm'>
      <div className='flex items-center  justify-between max-w-6xl mx-5 lg:mx-auto  '>
        {/* left */}

        <div>
          <div
            className='relative h-16 w-24 cursor-pointer hidden lg:inline-grid'
            onClick={() => router.push('/')}
          >
            <Image
              src='https://links.papareact.com/ocw'
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer '>
            <Image
              src='https://links.papareact.com/jjm'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>

        {/* middle - search */}
        <div className='max-w-xs'>
          <div className='relative  p-3 '>
            <div className='absolute pointer-events-none inset-y-0 pl-3 flex items-center'>
              <SearchIcon className='h-5 w-5 text-gray-500 ' />
            </div>
            <input
              type='text'
              className='bg-gray-50 w-full pl-10 sm:text-sm border border-gray-300 focus:ring-black focus:border-black rounded-md '
              placeholder='Search'
            />
          </div>
        </div>

        {/* right */}
        <div className='flex items-center space-x-4 justify-end'>
          <HomeIcon onClick={() => router.push('/')} className='navBtn' />
          <MenuIcon className='h-6 md:hidden' />

          {session ? (
            <>
              <div className='relative navBtn'>
                <PaperAirplaneIcon className='navBtn rotate-45 ' />
                <div className='absolute -top-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white font-medium -right-2 text-xs '>
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className='navBtn'
              />
              <UserGroupIcon className='navBtn' />
              <HeartIcon className='navBtn' />
              <img
                src={session?.user?.image}
                className='cursor-pointer h-10 rounded-full'
                alt='profile image'
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
