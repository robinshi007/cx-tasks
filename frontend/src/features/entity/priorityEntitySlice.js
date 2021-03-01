import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { prioritySeed } from './seed/prioritySeed';

import { Service as IDB } from './idb/idb';
export const getAllPriorityThunk = createAsyncThunk('priority/getAll', async () => {
  return await IDB.getAll('priorities');
});

const prioritySlice = createSlice({
  name: 'priority',
  initialState: {
    ...prioritySeed,
  },
  reducers: {},
  extraReducers: {
    [getAllPriorityThunk.fulfilled]: (state, { payload }) => {
      payload.forEach((priority) => {
        state[priority.id] = priority;
      });
      console.log('bootstrap: load priorities');
    },
  },
});

export default prioritySlice.reducer;
