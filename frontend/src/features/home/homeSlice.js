import { createSelector, createSlice } from '@reduxjs/toolkit';
import { default as defaultState } from './defaultState';
import { orderBy } from 'lodash';

export const homeSlice = createSlice({
  name: 'home',
  initialState: defaultState,
  reducers: {
    setFilterTerm: (state, { payload }) => {
      state.projectFilters.filterTerm = payload;
      return state;
    },
  },
});

export const selectRecentProjects = (state) => state.home.recentProjects;
export const selectFilterTerm = (state) => state.home.projectFilters.filterTerm;
export const selectFilterTermProjects = createSelector(
  [selectRecentProjects, selectFilterTerm],
  (projects, term) => {
    if (term !== '') {
      return Object.values(projects).filter((project) =>
        project.title.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      return projects;
    }
  }
);
export const selectMyTasks = (state) => state.home.tasks;
export const selectMyTasksWorkedOn = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    Object.values(tasks).filter((task) => task.status === 13),
    (t) => t.updated_at,
    'asc'
  )
);
export const selectMyTasksAssignedToMe = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    Object.values(tasks).filter((task) => task.status === 12),
    (t) => t.assigned_at,
    'asc'
  )
);
export const { setFilterTerm } = homeSlice.actions;

export default homeSlice.reducer;
