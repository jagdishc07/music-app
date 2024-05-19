import React from 'react';
import logo from '/spotifylogo.svg';
import SongPlay from '../components/SongPlay';
import SongsList from '../components/SongsList';
import SongPlayLoading from '../components/SongPlayLoading';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isReady } = useSelector((state) => state.player);
  return (
    <div className='h-screen w-screen relative'>
      <img
        className='absolute h-10 top-5 left-5'
        src={logo}
        alt='spotify logo'
      />
      <div className='grid grid-cols-12 gap-5 h-full p-5'>
        <div className='col-span-2 md:col-span-2 md:flex flex-col hidden justify-between mt-16 p-1'>
          <ul className='flex flex-col gap-5 text-darklight text-2xl'>
            <li className='text-copy cursor-pointer'>For You</li>
            <li className='cursor-pointer'>Top Track</li>
            <li className='cursor-pointer'>Favourites</li>
            <li className='cursor-pointer'>Recently Played</li>
          </ul>

          <img
            src='https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
            alt=''
            className='rounded-full w-[48px] h-[48px]'
          />
        </div>
        <div className='md:col-span-4 col-span-12 py-2 mt-10 md:mt-0'>
          <SongsList />
        </div>
        <div className='col-span-12 md:col-span-6  mt-16 flex justify-center relative'>
          {!isReady && <SongPlayLoading />}
          <SongPlay />
        </div>
      </div>
    </div>
  );
};

export default Home;
