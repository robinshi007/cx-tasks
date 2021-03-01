import { createSelector, createSlice } from '@reduxjs/toolkit';
import { orderBy, pickBy } from 'lodash';

import { default as defaultState } from './defaultState';
import { cacheTaskWithTitles, cacheProjectWithTitles } from '@/features/shared';

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

const selectCurrentUserId = (state) => state.auth.currentUser.id;
const selectProjects = (state) => state.entities.projects;
export const selectOwnedTasks = (state) =>
  pickBy(state.entities.tasks, (v) => v.assignee === state.auth.currentUser.id);
export const selectRecentProjects = createSelector(
  [selectProjects, selectCurrentUserId],
  (projects, userId) => {
    return pickBy(projects, (val) => val.owner === userId);
  }
);
const selectEntities = (state) => state.entities;
export const selectFilterTerm = (state) => state.home.projectFilters.filterTerm;
export const selectFilterTermProjects = createSelector(
  [selectRecentProjects, selectFilterTerm, selectEntities],
  (projects, term, entities) => {
    if (term !== '') {
      return Object.values(projects)
        .filter((project) => project.title.toLowerCase().includes(term.toLowerCase()))
        .map((p) => cacheProjectWithTitles(entities, p));
    } else {
      return Object.values(projects).map((p) => cacheProjectWithTitles(entities, p));
    }
  }
);
export const selectMyTasks = (state) =>
  Object.values(state.entities.tasks)
    .filter((task) => task.assignee === '1')
    .map((task) => cacheTaskWithTitles(state.entities, task));

export const selectMyTasksWorkedOn = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    tasks.filter((task) => task.status === '3'),
    (t) => t.updated_at,
    'asc'
  )
);

export const selectMyTasksAssignedToMe = createSelector(selectMyTasks, (tasks) =>
  orderBy(
    tasks.filter((task) => task.status === '2'),
    (t) => t.assigned_at,
    'asc'
  )
);
export const { setFilterTerm } = homeSlice.actions;

export default homeSlice.reducer;
