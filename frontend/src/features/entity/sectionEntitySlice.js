import { createSlice } from '@reduxjs/toolkit';
import { sectionSeed } from './seed/sectionSeed';

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    ...sectionSeed,
  },
  reducers: {
    setSectionNew: (state, action) => {
      const newId = action.payload.id;
      if (!!state[newId]) {
        // TODO:  sync to backend
        console.log('Please sync the new task to the backend first');
      } else {
        state[action.payload.id] = action.payload.section;
      }
    },
    setSection: (state, action) => {
      const section = state[action.payload.id];
      section.title = action.payload.section.title;
      section.description = action.payload.section.description;
    },

    updateSectionListDragged: (state, { payload }) => {
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
export const { setSection, setSectionNew, updateSectionListDragged } = sectionSlice.actions;

export default sectionSlice.reducer;
