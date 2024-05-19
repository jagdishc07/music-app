import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';
import {
  useGetSongTrackQuery,
  useGetSongsBySearchQuery
} from '../redux/services/soundCloud';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setStopPlay } from '../redux/features/playerSlice';
import { motion } from 'framer-motion';
import SongsListLoaded from './SongsListLoaded';
import Modal from './Modal';

const SongsList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [track, setTrack] = useState('');
  const [songs, setSongs] = useState([]);
  const { isPlaying } = useSelector((state) => state.player);
  const [open, setOpen] = useState(false);
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
    setSearchTerm('');
    setSearchTerm(e.target.value);
  };

  const songSelectionHandler = (track) => {
    setOpen(true);
    dispatch(setStopPlay(false));
    setTrack(track);
  };

  const debouncedResults = useMemo(() => {
    return debounce(searchHandler, 500);
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
    hidden: { opacity: 0, y: 0 },
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
        url: item.permalink
      }));
      setSongs(filterSongsData);
    } else if (error) {
      toast.error('Invalid response');
    }
  }, [data, error]);

  useEffect(() => {
    if (trackData && trackData.status === true && !isPlaying) {
      const payload = {
        url: trackData.audio[0].url,
        title: trackData.title,
        album: trackData.labelName,
        img: trackData.artworkUrl,
        isPlaying: false,
        isReady: false,
        duration: trackData.audio[0].durationText
      };
      dispatch(setCurrentSong(payload));
    } else if (trackError) {
      toast.error('Invalid response');
    }
  }, [trackData]);

  useEffect(() => {
    if (searchTerm === '') {
      setSongs(defaultSongs);
      setTrack(defaultSongs[0].url);
    }
  }, [searchTerm]);

  return (
    <>
      <Toaster />
      {/* <Modal open={open} setOpen={setOpen} /> */}
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
          className='flex flex-col space-y-5 mt-5 h-[50vh] md:h-[75vh] overflow-y-auto overflow-x-hidden songlistparent'
          variants={gridContainerVariants}
          initial='hidden'
          // animate='show'
          whileInView='show'
        >
          {songs.map((item, index) => (
            <motion.div
              className={`flex items-center justify-between rounded-lg p-3 cursor-pointer hover:bg-foreground transition ease-in-out`}
              onClick={() => songSelectionHandler(item.url)}
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

const defaultSongs = [
  {
    url: 'https://soundcloud.com/mitskiofficial/my-love-mine-all-mine',
    name: 'My Love Mine All Mine',
    caption: null,
    description: null,
    goPlus: false,
    durationMs: 137822,
    duration: '02:17',
    img: 'https://i1.sndcdn.com/artworks-5NLon0cRDARq-0-original.jpg',
    releaseDate: '2023-09-15T00:00:00Z',
    genre: 'Alternative Rock',
    album: 'Dead Oceans'
  },
  {
    type: 'track',
    id: 255793762,
    url: 'https://soundcloud.com/keyshiacoleofficial/love',
    createdAt: '2016-03-29T16:03:29Z',
    lastModified: '2023-11-24T08:55:55Z',
    name: 'Love',
    caption: null,
    description: null,
    goPlus: true,
    durationMs: 255266,
    duration: '04:15',
    img: 'https://i1.sndcdn.com/artworks-7ZhefHsj9qFj-0-original.jpg',
    releaseDate: '2005-01-01T00:00:00Z',
    genre: 'R & B',
    album: 'A&M (UC)'
  },
  {
    type: 'track',
    id: 73081887,
    url: 'https://soundcloud.com/chiefkeef/love-sosa1',
    createdAt: '2012-12-30T20:40:56Z',
    lastModified: '2024-01-22T03:03:00Z',
    name: 'Love Sosa',
    caption: null,
    description:
      'Chief Keef\nLove Sosa\nProd. Young Chop\nFinally Rich (2012)\n\nBooking Info : 773-209-2866',
    goPlus: false,
    durationMs: 204191,
    duration: '03:24',
    img: 'https://i1.sndcdn.com/artworks-000039963889-fwtyui-original.jpg',
    releaseDate: null,
    genre: 'Hip Hop/rap',
    album: 'Interscope Records'
  },
  {
    type: 'track',
    id: 582337698,
    url: 'https://soundcloud.com/summerwalker/girls-need-love-with-drake',
    createdAt: '2019-02-27T20:31:25Z',
    lastModified: '2024-02-20T11:57:28Z',
    name: 'Summer Walker, Drake - Girls Need Love (with Drake) (Remix)',
    caption: null,
    description: null,
    goPlus: false,
    durationMs: 222452,
    duration: '03:42',
    img: 'https://i1.sndcdn.com/artworks-kpz6O7yAVRhl-0-original.jpg',
    releaseDate: '2018-10-19T00:00:00Z',
    genre: 'R & B',
    album: 'LVRN/Interscope Records'
  },
  {
    type: 'track',
    id: 271225763,
    url: 'https://soundcloud.com/chiefkeef/love-sosa-2',
    createdAt: '2016-06-28T13:08:34Z',
    lastModified: '2024-01-22T03:03:00Z',
    name: 'Love Sosa',
    caption: null,
    description: null,
    goPlus: false,
    durationMs: 246256,
    duration: '04:06',
    img: 'https://i1.sndcdn.com/artworks-X8otf1Y183je-0-original.jpg',
    releaseDate: '2012-01-01T00:00:00Z',
    genre: 'Hip Hop',
    album: 'UMGRI Interscope'
  },
  {
    type: 'track',
    id: 169210568,
    url: 'https://soundcloud.com/thewaltersband/i-love-you-so-1',
    createdAt: '2014-09-24T20:09:20Z',
    lastModified: '2022-07-10T12:56:42Z',
    name: 'I Love You So',
    caption: null,
    description: "Vinyl, T-Shirts & CD's @\nwww.yourwalters.com",
    goPlus: false,
    durationMs: 160353,
    duration: '02:40',
    img: 'https://i1.sndcdn.com/artworks-000098822307-nwhex2-original.jpg',
    releaseDate: null,
    genre: 'alternative',
    album: null
  },
  {
    type: 'track',
    id: 292549863,
    url: 'https://soundcloud.com/lyfsuxx/we-fell-in-love-in-buddyville',
    createdAt: '2016-11-11T14:35:21Z',
    lastModified: '2022-07-11T06:58:56Z',
    name: 'we fell in love in october',
    caption: null,
    description: '',
    goPlus: false,
    durationMs: 184189,
    duration: '03:04',
    img: 'https://i1.sndcdn.com/artworks-zKK2VlDEhcNc-0-original.jpg',
    releaseDate: '2018-11-13T00:00:00Z',
    genre: 'Alternative',
    album: 'Marie Ulven'
  },
  {
    type: 'track',
    id: 656381969,
    url: 'https://soundcloud.com/ynwmelly/dangerously-in-love-772-love-pt-2',
    createdAt: '2019-07-25T19:24:59Z',
    lastModified: '2022-10-10T11:55:59Z',
    name: 'Dangerously In Love (772 Love Pt. 2)',
    caption: null,
    description: 'Dangerously In Love (772 Love Pt. 2)',
    goPlus: false,
    durationMs: 308690,
    duration: '05:08',
    img: 'https://i1.sndcdn.com/artworks-qiIW8cSrgzgF8aQz-3bgSnQ-original.jpg',
    releaseDate: null,
    genre: 'Hip-hop & Rap',
    album: null
  },
  {
    type: 'track',
    id: 317617211,
    url: 'https://soundcloud.com/kendrick-lamar-music/love',
    createdAt: '2017-04-14T04:22:27Z',
    lastModified: '2023-09-20T22:13:19Z',
    name: 'LOVE. (feat. Zacari)',
    caption: null,
    description: null,
    goPlus: true,
    durationMs: 213447,
    duration: '03:33',
    img: 'https://i1.sndcdn.com/artworks-lYeaZq98UTZ3-0-original.jpg',
    releaseDate: '2017-04-14T00:00:00Z',
    genre: 'Hip Hop',
    album: 'Aftermath'
  },
  {
    type: 'track',
    id: 1284576295,
    url: 'https://soundcloud.com/lukecombs/the-kind-of-love-we-make',
    createdAt: '2022-06-10T00:23:54Z',
    lastModified: '2022-08-11T03:08:24Z',
    name: 'The Kind of Love We Make',
    caption: null,
    description: null,
    goPlus: true,
    durationMs: 224470,
    duration: '03:44',
    img: 'https://i1.sndcdn.com/artworks-PIkzdqY7MDS0-0-original.jpg',
    releaseDate: '2022-06-17T00:00:00Z',
    genre: 'Country',
    album: 'River House Artists/Columbia Nashville'
  }
];
