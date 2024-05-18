import { FastForward, Pause, Play, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from './AudioPlayer';
import { setCurrentSongPlay } from '../redux/features/playerSlice';

const SongPlay = () => {
  const data = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [duration, setDuration] = React.useState(0);

  const togglePlayPause = () => {
    dispatch(setCurrentSongPlay(!data.isPlaying));
  };

  const string = data.isReady ? 'visible' : 'invisible';

  return (
    <div className={`w-[450px] ${string}`}>
      <div className='w-full'>
        <h1 className='text-white font-bold text-[32px]'>{data.title}</h1>
        <p className='text-copylight'>{data.album}</p>
      </div>
      <img
        src={data.img}
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
            <span
              className='p-3 bg-foreground rounded-full inline-block'
              onClick={togglePlayPause}
            >
              {' '}
              {data.isPlaying ? (
                <Play fill='#fff' stroke='#fff' size={16} />
              ) : (
                <Pause fill='#fff' stroke='#fff' size={16} />
              )}
              {/* <Play fill='#fff' stroke='#fff' size={16} /> */}
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
      <AudioPlayer key={data.url} setDuration={setDuration} />
    </div>
  );
};

export default SongPlay;
