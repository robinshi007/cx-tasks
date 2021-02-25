import { createSlice } from '@reduxjs/toolkit';
import { statusSeed } from './seed/statusSeed';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    ...statusSeed,
  },
  reducers: {},
});

export default statusSlice.reducer;
