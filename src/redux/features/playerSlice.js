// src/redux/slices/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  isPlaying: null,
  title: '',
  album: '',
  img: '',
  isReady: null,
  currentProgress: 0,
  duration: 0
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      console.log(action.payload);
      state.url = action.payload.url;
      state.isPlaying = action.payload.isPlaying;
      state.title = action.payload.title;
      state.album = action.payload.album;
      state.img = action.payload.img;
      state.isReady = action.payload.isReady;
      state.duration = action.payload.duration;
    },
    setCurrentSongPlay(state, action) {
      state.isPlaying = action.payload;
    },
    setStopPlay(state, action) {
      state.isPlaying = action.payload;
    },
    setCurrentSongReady(state, action) {
      state.isReady = action.payload;
      state.isPlaying = true;
    },
    setCurrentTime(state, action) {
      state.currentProgress = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    }
  }
});

export const {
  setCurrentSong,
  setCurrentSongPlay,
  setCurrentSongReady,
  setCurrentTime,
  setDuration,
  setStopPlay
} = playerSlice.actions;
export default playerSlice.reducer;
