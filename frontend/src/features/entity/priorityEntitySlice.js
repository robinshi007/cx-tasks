import { createSlice } from '@reduxjs/toolkit';
import { prioritySeed } from './seed/prioritySeed';

const prioritySlice = createSlice({
  name: 'priority',
  initialState: {
    ...prioritySeed,
  },
  reducers: {},
});

export default prioritySlice.reducer;
