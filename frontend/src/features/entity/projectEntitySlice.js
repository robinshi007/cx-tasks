import { createSlice } from '@reduxjs/toolkit';
import { projectSeed } from './seed/projectSeed';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    ...projectSeed,
  },
  reducers: {
    setProject: (state, action) => {
      const id = action.payload.id;
      state[id].title = action.payload.project.title;
      state[id].description = action.payload.project.description;
    },
    setProjectNew: (state, action) => {
      const newId = action.payload.id;
      console.log(action.payload.project);
      if (!!state[newId]) {
        // TODO:  sync to backend
        console.log('Please sync the new project to the backend first');
      } else {
        state[action.payload.id] = action.payload.project;
      }
    },
  },
});
export const { setProjectNew, setProject } = projectSlice.actions;

export const selectCurrrentProjectId = (state) => state.project.currentProjectId;

export default projectSlice.reducer;