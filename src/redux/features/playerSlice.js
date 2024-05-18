// src/redux/slices/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  isPlaying: null,
  title: '',
  album: '',
  img: '',
  isReady: null
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
    },
    setCurrentSongPlay(state, action) {
      state.isPlaying = action.payload;
    },
    setCurrentSongReady(state, action) {
      state.isReady = action.payload;
    }
  }
});

export const { setCurrentSong, setCurrentSongPlay, setCurrentSongReady } =
  playerSlice.actions;
export default playerSlice.reducer;
