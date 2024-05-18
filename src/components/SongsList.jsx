import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';
import {
  useGetSongTrackQuery,
  useGetSongsBySearchQuery
} from '../redux/services/soundCloud';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/features/playerSlice';
import { motion } from 'framer-motion';
import SongsListLoaded from './SongsListLoaded';

const SongsList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [track, setTrack] = useState('');
  const [songs, setSongs] = useState([]);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm, {
    skip: !searchTerm
  });
  const {
    data: trackData,
    isFetching: trackIsFetching,
    error: trackError
  } = useGetSongTrackQuery(track, {
    skip: !track
  });

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const songSelectionHandler = (track) => {
    setTrack(track);
  };

  const debouncedResults = useMemo(() => {
    return debounce(searchHandler, 1000);
  }, []);

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const gridSquareVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0
    }
  };

  useEffect(() => {
    if (data && data.status === true) {
      const songs = data.tracks.items;
      const filterSongsData = songs.map((item) => ({
        name: item.title,
        album: item.user.name,
        img: item.artworkUrl,
        duration: item.durationText,
        track: item.permalink
      }));
      setSongs(filterSongsData);
    } else if (error) {
      toast.error('Invalid response');
    }
  }, [data, error]);

  useEffect(() => {
    if (trackData && trackData.status === true) {
      const payload = {
        url: trackData.audio[0].url,
        title: trackData.title,
        album: trackData.labelName,
        img: trackData.artworkUrl,
        isPlaying: true,
        isReady: false
      };
      dispatch(setCurrentSong(payload));
    } else if (trackError) {
      toast.error('Invalid response');
    }
  }, [trackData]);

  return (
    <>
      <Toaster />
      <h1 className='text-white font-bold text-[32px]'>For You</h1>
      <div className='relative'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Search Song, Artist'
          className='rounded-lg w-full border-none mt-4 outline-none pl-[10px] pr-[45px] py-[16px] text-copy placeholder:text-copylight bg-foreground'
          onChange={(e) => {
            setSongs([]);
            debouncedResults(e);
          }}
        />
        <Search
          className='absolute bottom-[16px] right-[10px] text-copylight cursor-pointer'
          onClick={() =>
            dispatch(
              setCurrentSong({
                url: 'https://scd.dlod.link/?expire=1716067086350&p=KWV5CoE1cQAG86_Eoh2cNEhDpNQ4jXRCIlYFrxo6Am8KoPwfa1AXdUOtTGaYv06geDA4A_nFMuUwTP776Pw-7WvSO60MSmZncWmgM3DGrPKqwcnjS_mRkkKblC8utn0IOHbWYGqmZYAzco0yVhsZviqXGJ2iyWVCmeZvkHkJnnZM_YJ8PCdzLkg3LwMys2DeHu1JETutOF9UqPCBKbt3Uw&s=eJgFR0RA72j8GTyTtalzqaCTKqoT1FlcZ1rEstZ137I',
                title: 'Ed Sheeran - Photograph',
                album: 'Atlantic Records UK',
                img: 'https://i1.sndcdn.com/artworks-fFOPkhvML64x-0-original.jpg',
                isPlaying: true,
                isReady: false
              })
            )
          }
        />
      </div>
      {songs.length > 0 ? (
        <motion.div
          className='flex flex-col space-y-5 mt-5 h-[75vh] overflow-y-auto overflow-x-hidden songlistparent'
          variants={gridContainerVariants}
          initial='hidden'
          animate='show'
          // whileInView='show'
        >
          {songs.map((item, index) => (
            <motion.div
              className={`flex items-center justify-between rounded-lg p-3 cursor-pointer hover:bg-foreground transition ease-in-out`}
              onClick={() => songSelectionHandler(item.track)}
              key={index}
              variants={gridSquareVariants}
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
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <SongsListLoaded />
      )}
    </>
  );
};

export default SongsList;
