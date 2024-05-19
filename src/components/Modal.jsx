import { FastForward, Pause, Play, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from './AudioPlayer';
import { setCurrentSongPlay } from '../redux/features/playerSlice';
import AudioProgress from './AudioProgress';
import useMeasure from 'react-use-measure';
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion
} from 'framer-motion';

const Modal = ({ open, setOpen, children }) => {
  const data = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [duration, setDuration] = React.useState(0);
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0]
    });

    const yStart = typeof y.get() === 'number' ? y.get() : 0;

    await animate('#drawer', {
      y: [yStart, height]
    });

    setOpen(false);
  };

  const togglePlayPause = () => {
    dispatch(setCurrentSongPlay(!data.isPlaying));
  };

  const string = data.isReady ? 'visible' : 'invisible';

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className='fixed inset-0 z-50 bg-neutral-950/70'
        >
          <motion.div
            id='drawer'
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{
              ease: 'easeInOut'
            }}
            className='absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900'
            style={{ y }}
            drag='y'
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5
            }}
          >
            <div className={`w-[450px] ${string}`}>
              <div className='w-full'>
                <h1 className='text-white font-bold text-[32px]'>
                  {data.title}
                </h1>
                <p className='text-copylight'>{data.album}</p>
              </div>
              <img
                src={data.img}
                alt=''
                className='rounded-lg w-full min-w-[300px] mt-16'
              />

              <div className='mt-5'>
                {/* Audio Progress bar */}
                <AudioProgress
                  duration={duration}
                  currentProgress={data.currentProgress}
                  buffered={0} // You can update this if you have buffered data
                  onChange={(e) => {
                    const newTime = e.target.value;
                    const audioElement = document.getElementById('musice');
                    audioElement.currentTime = newTime;
                  }}
                />

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
                        <Pause fill='#fff' stroke='#fff' size={16} />
                      ) : (
                        <Play fill='#fff' stroke='#fff' size={16} />
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
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
