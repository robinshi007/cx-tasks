import { createSlice } from '@reduxjs/toolkit';
import { taskTypeSeed } from './seed/taskTypeSeed';

const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState: {
    ...taskTypeSeed,
  },
  reducers: {},
});

export default taskTypeSlice.reducer;
