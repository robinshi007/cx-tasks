import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskTypeSeed } from './seed/taskTypeSeed';

import { Service as IDB } from './idb/idb';
export const getAllTaskTypeThunk = createAsyncThunk('taskType/getAll', async () => {
  return await IDB.getAll('task_types');
});

const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState: {
    ...taskTypeSeed,
  },
  reducers: {},
  extraReducers: {
    [getAllTaskTypeThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        payload.forEach((taskType) => {
          state[taskType.id] = taskType;
        });
        //console.log('bootstrap: load task_types');
      }
    },
  },
});

export default taskTypeSlice.reducer;
