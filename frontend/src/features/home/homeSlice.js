import { createSelector, createSlice } from '@reduxjs/toolkit';
import { orderBy } from 'lodash';

import { default as defaultState } from './defaultState';
import { cacheTaskWithTitles } from '@/features/shared';

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

export const selectRecentProjects = (state) => state.entities.projects;
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
export const selectMyTasks = (state) =>
  Object.values(state.entities.tasks)
    .filter((task) => task.assignee === '61')
    .map((task) => cacheTaskWithTitles(state.entities, task));

export const selectMyTasksWorkedOn = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    tasks.filter((task) => task.status === '13'),
    (t) => t.updated_at,
    'asc'
  )
);

export const selectMyTasksAssignedToMe = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    tasks.filter((task) => task.status === '12'),
    (t) => t.assigned_at,
    'asc'
  )
);
export const { setFilterTerm } = homeSlice.actions;

export default homeSlice.reducer;
