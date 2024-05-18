import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentSongPlay,
  setCurrentSongReady
} from '../redux/features/playerSlice';

const AudioPlayer = ({ setDuration }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player);
  const audioRef = useRef(null);

  const songPlayHandler = (playValue) => {
    dispatch(setCurrentSongPlay(playValue));
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSong.url]);

  useEffect(() => {
    if (currentSong.isPlaying) {
      console.log(currentSong.isPlaying, currentSong.isReady);
      audioRef.current?.play().catch((error) => {
        console.error('Failed to play:', error);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [currentSong.isReady, currentSong.isPlaying]);
  return (
    <div className='audio-player w-full'>
      <audio
        ref={audioRef}
        onCanPlay={(e) => {
          dispatch(setCurrentSongReady(true));
        }}
        id='musice'
        preload='metadata'
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onPlaying={() => songPlayHandler(true)}
        onPause={() => songPlayHandler(false)}
      >
        <source src={currentSong.url} type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default AudioPlayer;
