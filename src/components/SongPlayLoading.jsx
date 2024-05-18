import { FastForward } from 'lucide-react';
import React from 'react';

const SongPlayLoading = () => {
  return (
    <div className='animate-pulse w-[450px] absolute top-0'>
      <div class='w-full'>
        <div class='w-60 bg-foreground h-[32px] rounded-lg' />
        <div class='w-20 bg-foreground h-[18px] rounded-lg mt-3' />
        <div className='w-full mt-16 min-w-[300px] min-h-[300px] h-[400px] bg-foreground rounded-lg' />
      </div>
      <div className='mt-5'>
        <span className='inline-block h-1 w-full bg-foreground rounded-full' />
        <div className='mt-5 flex justify-between items-center'>
          <div className='flex gap-1 rounded-full p-2 items-center justify-center bg-foreground w-10 h-10' />
          <div className='flex justify-center items-center gap-3'>
            <FastForward
              fill='#ffffff22'
              stroke='#ffffff22'
              size={16}
              className='rotate-180'
            />
            <div className='flex gap-1 rounded-full p-2 items-center justify-center bg-foreground w-10 h-10' />
            <FastForward fill='#ffffff22' stroke='#ffffff22' size={16} />
          </div>
          <div className='flex gap-1 rounded-full p-2 items-center justify-center bg-foreground w-10 h-10' />
        </div>
      </div>
    </div>
  );
};

export default SongPlayLoading;
