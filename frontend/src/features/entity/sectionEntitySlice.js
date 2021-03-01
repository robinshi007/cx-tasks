import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sectionSeed } from './seed/sectionSeed';

import { Service as IDB } from './idb/idb';
import toast from 'react-hot-toast';

export const getAllSectionThunk = createAsyncThunk('section/getAll', async () => {
  return await IDB.getAll('sections');
});

export const putAllSectionThunk = createAsyncThunk('section/putAll', async (sections) => {
  return await Promise.all(
    sections.map(async (obj) => {
      return await IDB.put('sections', obj);
    })
  );
});
export const putSectionThunk = createAsyncThunk('section/put', async (section) => {
  return await IDB.put('sections', section);
});
export const putNewSectionThunk = createAsyncThunk('section/putNew', async (section) => {
  return await IDB.put('sections', section);
});

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    ...sectionSeed,
  },
  reducers: {
    setSectionNew: (state, action) => {
      state[action.payload.id] = action.payload.section;
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
  extraReducers: {
    [getAllSectionThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        payload.forEach((section) => {
          state[section.id] = section;
        });
        //console.log('bootstrap: load sections');
      }
    },
    [putAllSectionThunk.fulfilled]: () => {
      toast.success(`All data are synced to local.`);
    },
    [putSectionThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Section #${payload} Update successfully.`);
    },
    [putNewSectionThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Section #${payload} created successfully.`);
    },
  },
});
export const { setSection, setSectionNew, updateSectionListDragged } = sectionSlice.actions;

export default sectionSlice.reducer;
