import React from 'react';
import logo from '/spotifylogo.svg';
import {
  FastForward,
  Forward,
  Play,
  Search,
  Volume,
  Volume2
} from 'lucide-react';

const songs = [
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  },
  {
    name: 'Starboy',
    album: 'The Weekend',
    img: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
    duration: '4:16'
  }
];

const Home = () => {
  return (
    <div className='h-screen w-screen relative'>
      <img
        className='absolute h-10 top-5 left-5'
        src={logo}
        alt='spotify logo'
      />
      <div className='grid grid-cols-12 gap-5 h-full p-5'>
        <div className='col-span-2 flex flex-col justify-between mt-16 p-1'>
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
        <div className='col-span-4 py-2'>
          <h1 className='text-white font-bold text-[32px]'>For You</h1>
          <div className='relative'>
            <input
              type='text'
              name='search'
              id='search'
              placeholder='Search Song, Artist'
              className='rounded-lg w-full border-none mt-4 outline-none pl-[10px] pr-[45px] py-[16px] text-copy placeholder:text-copylight bg-foreground'
            />
            <Search className='absolute bottom-[16px] right-[10px] text-copylight' />
          </div>
          <div className='flex flex-col space-y-5 mt-5'>
            {songs.map((item, index) => (
              <div
                className={`${
                  index === 3 ? 'bg-foreground' : ''
                } flex items-center justify-between rounded-lg p-3 cursor-pointer hover:bg-foreground transition ease-in-out`}
              >
                <div className='flex items-center gap-3'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className='rounded-full w-[48px] h-[48px]'
                  />
                  <div>
                    <h1 className='text-white font-bold text-[18px]'>
                      {item.name}
                    </h1>
                    <p className='text-copylight text-[14px]'>{item.album}</p>
                  </div>
                </div>
                <p className='text-copylight text-[18px]'>{item.duration}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-6  mt-16 flex justify-center '>
          <div className='w-[450px]'>
            <div className='w-full'>
              <h1 className='text-white font-bold text-[32px]'>Viva La Vida</h1>
              <p className='text-copylight'>Coldplay</p>
            </div>
            <img
              src='https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452'
              alt=''
              className='rounded-lg w-full min-w-[300px] mt-16'
            />

            <div className='mt-5'>
              <span className='inline-block h-1 w-full bg-white rounded-full' />
              <div className='mt-5 flex justify-between items-center'>
                <div className='flex gap-1 rounded-full p-2 items-center justify-center bg-foreground w-10 h-10'>
                  <span className='inline-block h-[5px] w-[5px] rounded-full bg-white'></span>
                  <span className='inline-block h-[5px] w-[5px] rounded-full bg-white'></span>
                  <span className='inline-block h-[5px] w-[5px] rounded-full bg-white'></span>
                </div>
                <div className=''>
                  <span className='p-3  rounded-full inline-block rotate-180'>
                    <FastForward fill='#fff' stroke='#fff' size={16} />
                  </span>
                  <span className='p-3 bg-foreground rounded-full inline-block'>
                    <Play fill='#fff' stroke='#fff' size={16} />
                  </span>
                  <span className='p-3 rounded-full inline-block'>
                    <FastForward fill='#fff' stroke='#fff' size={16} />
                  </span>
                </div>
                <div>
                  <span className='p-3 bg-foreground rounded-full inline-block'>
                    <Volume2 fill='#fff' stroke='#fff' size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
