// src/redux/slices/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isListload: false
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateListload(state, action) {
      state.isListload = action.payload;
    }
  }
});

export const { updateListload } = playerSlice.actions;
export default playerSlice.reducer;
