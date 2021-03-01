import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { statusSeed } from './seed/statusSeed';

import { Service as IDB } from './idb/idb';
export const getAllStatusThunk = createAsyncThunk('status/getAll', async () => {
  return await IDB.getAll('statuses');
});

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    ...statusSeed,
  },
  reducers: {},
  extraReducers: {
    [getAllStatusThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        payload.forEach((status) => {
          state[status.id] = status;
        });
        //console.log('bootstrap: load statuses');
      }
    },
  },
});

export default statusSlice.reducer;
