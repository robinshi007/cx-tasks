import { createSlice } from '@reduxjs/toolkit';
import { userSeed } from './seed/userSeed';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...userSeed,
  },
  reducers: {
    updateUserListDragged: (state, { payload }) => {
      // TODO: will reorder the card order if the order difference goes narrow
      if (payload.source.listIndex === payload.destination.listIndex) {
        return;
      }
      let newOrder = 0;
      const step = 100;
      // update the order in the same list
      const { previousOrder, nextOrder } = payload.position;
      if (previousOrder === 0 && nextOrder !== 0) {
        newOrder = nextOrder - step;
      } else if (previousOrder !== 0 && nextOrder === 0) {
        newOrder = previousOrder + step;
      } else if (previousOrder !== 0 && nextOrder !== 0) {
        newOrder = Math.floor((previousOrder + nextOrder) / 2);
      }
      // if (sourceListIndex !== destListIndex) {
      const newList = state[payload.position.listId];
      newList[payload.order] = newOrder;
    },
  },
});

export const { updateUserListDragged } = userSlice.actions;

export default userSlice.reducer;
