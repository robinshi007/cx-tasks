import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { projectSeed } from './seed/projectSeed';

import * as API from './idb/project';
import toast from 'react-hot-toast';

export const getAllProjectThunk = createAsyncThunk('project/getAll', async () => {
  return await API.getAll();
});

export const putAllProjectThunk = createAsyncThunk('project/putAll', async (projects) => {
  return await API.putAll(Object.values(projects));
});
export const putProjectThunk = createAsyncThunk('project/put', async (project) => {
  return await API.put(project);
});
export const putNewProjectThunk = createAsyncThunk('project/putNew', async (project) => {
  return await API.put(project);
});

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
      state[action.payload.id] = action.payload.project;
    },
  },
  extraReducers: {
    [getAllProjectThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        payload.forEach((project) => {
          state[project.id] = project;
        });
        //console.log('bootstrap: load projects');
      }
    },
    [putAllProjectThunk.fulfilled]: () => {
      toast.success(`All data are synced to local.`);
    },
    [putProjectThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Project #${payload} Update successfully.`);
    },
    [putNewProjectThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Project #${payload} created successfully.`);
    },
  },
});
export const { setProjectNew, setProject } = projectSlice.actions;

export const selectProjects = (state) => state.entities.projects;
export const selectCurrentProjectId = (state) => state.project.currentProjectId;
export const selectCurrentProject = createSelector(
  [selectCurrentProjectId, selectProjects],
  (id, projects) => {
    return projects[id];
  }
);

export default projectSlice.reducer;
