import React from 'react';

const AudioProgressBar = ({
  duration,
  currentProgress,
  buffered,
  onChange
}) => {
  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : (currentProgress / duration) * 100;
  const bufferedWidth = isNaN(buffered / duration)
    ? 0
    : (buffered / duration) * 100;

  return (
    <div className='relative w-full h-1 bg-foreground rounded-full overflow-hidden'>
      <div
        className='absolute top-0 left-0 h-full bg-foreground'
        style={{ width: `${bufferedWidth}%` }}
      ></div>
      <div
        className='absolute top-0 left-0 h-full bg-copylight'
        style={{ width: `${progressBarWidth}%` }}
      ></div>
      <input
        type='range'
        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
        min={0}
        max={duration}
        value={currentProgress}
        onChange={onChange}
      />
    </div>
  );
};

export default AudioProgressBar;
