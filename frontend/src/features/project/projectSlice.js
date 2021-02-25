import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { differenceInDays, isThisWeek } from 'date-fns';
import { default as defaultState } from './defaultState';
import { orderBy, groupBy, map, merge } from 'lodash';
import {
  defaultTask,
  defaultSection,
  defaultProject,
  cacheTaskWithTitles,
} from '@/features/shared';
import { selectCurrrentProjectId } from '@/features/entity';

const defaultFilters = {
  filterTerm: '',
  filterRecent: false,
  filterDueThisWeek: false,
};
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    ...defaultState,
    filters: defaultFilters,
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProjectId = action.payload;
    },
    setFilterTerm: (state, action) => {
      state.filters.filterTerm = action.payload;
    },
    setFilterRecent: (state, action) => {
      state.filters.filterRecent = action.payload;
    },
    setFilterDueThisWeek: (state, action) => {
      state.filters.filterDueThisWeek = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = { field: action.payload, direction: 'asc' };
    },
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
    },
    setFilterReset: (state) => {
      state.filters = defaultFilters;
    },
  },
});

export const selectCurrentProjectId = (state) => state.project.currentProjectId;
export const selectProjectById = (id) => (state) => {
  let project;
  if (!id) {
    project = defaultProject();
  } else {
    project = state.entities.projects[id];
  }
  return project;
};
export const selectStatuses = (state) => state.entities.statuses;
export const selectPriorities = (state) => state.entities.priorities;
export const selectSections = (state) => state.entities.sections;
export const selectSectionById = (id, fields) => (state) => {
  let section;
  if (!id && fields) {
    section = merge(defaultSection(), fields);
  } else if (!id) {
    section = defaultSection();
  } else {
    section = state.entities.sections[id];
  }
  return section;
};

export const selectAssigneeById = (id) => (state) => {
  const assignee = state.entities.users[id];
  return assignee;
};
export const selectAssignees = (state) => state.entities.users;

export const selectTaskById = (id, fields) => (state) => {
  let task;
  if (!id && fields) {
    task = merge(defaultTask(), fields);
  } else if (!id) {
    task = defaultTask();
  } else {
    task = state.entities.tasks[id];
  }
  if (!!task) {
    return cacheTaskWithTitles(state.entities, task);
  } else {
    return task;
  }
};

export const selectEntities = (state) => state.entities;
export const selectTasks = (state) => state.entities.tasks;

export const selectTasksByCurrentProject = createSelector(
  [selectTasks, selectCurrrentProjectId, selectEntities],
  (tasks, pid, entities) => {
    return map(
      Object.values(tasks).filter((task) => task.project === pid),
      (task) => {
        return cacheTaskWithTitles(entities, task);
      }
    );
  }
);
export const selectGroupBy = (state) => state.project.groupBy;
export const selectSortBy = (state) => state.project.sortBy;
export const selectTasksSortBy = createSelector(
  [selectTasksByCurrentProject, selectSortBy],
  (tasks, sort) => {
    if (sort && sort.field !== '' && sort.direction !== '') {
      if (sort.field === 'none') {
        return orderBy(tasks, (t) => t.order, 'asc');
      } else {
        return orderBy(tasks, (t) => t[sort.field], sort.direction);
      }
    } else {
      return orderBy(tasks, (t) => t.order, 'asc');
    }
  }
);
export const selectTasksGroupBy = createSelector(
  [selectTasksSortBy, selectGroupBy],
  (tasks, group) => {
    if (group && group !== '') {
      return groupBy(tasks, group);
    } else {
      return groupBy(tasks, 'section');
    }
  }
);
export const selectTasksGroupByStatus = createSelector([selectTasksByCurrentProject], (tasks) => {
  return groupBy(
    orderBy(tasks, (t) => t.bdorder, 'asc'),
    'status'
  );
});
export const selectFilterTerm = (state) => state.project.filters.filterTerm;
export const selectFilterRecent = (state) => state.project.filters.filterRecent;
export const selectFilterDueThisWeek = (state) => state.project.filters.filterDueThisWeek;

export const selectCountedLists = createSelector(
  [selectGroupBy, selectTasksGroupBy, selectSections, selectAssignees],
  (group, lists, sections, assignees) => {
    let selectedGrouped;
    if (group === 'section') {
      selectedGrouped = sections;
    } else if (group === 'assignee') {
      selectedGrouped = assignees;
    }
    return Object.keys(selectedGrouped).map((groupId) => {
      let cards = [];
      if (lists[groupId]) {
        cards = Object.values(lists[groupId]);
      }
      const count = cards.length;
      const title =
        selectedGrouped[groupId] && selectedGrouped[groupId].title
          ? selectedGrouped[groupId].title
          : selectedGrouped[groupId].name;
      const order = selectedGrouped[groupId] && selectedGrouped[groupId].order;
      return {
        id: groupId,
        title,
        cards,
        count,
        order,
      };
    });
  }
);
export const selectCountedBoardLists = createSelector(
  [selectStatuses, selectTasksGroupByStatus],
  (statuses, lists) => {
    return Object.keys(statuses).map((statusId) => {
      let cards = [];
      if (lists[statusId]) {
        cards = Object.values(lists[statusId]);
      }
      const count = cards.length;
      const title = statuses[statusId] && statuses[statusId].title;
      const order = statuses[statusId] && statuses[statusId].order;
      return {
        id: statusId,
        title,
        cards,
        count,
        order,
      };
    });
  }
);
const filterAllFunc = (lists, recent, term, dueThisWeek) => {
  if (recent) {
    lists = lists.map((list) => {
      const cards = list.cards.filter((card) => {
        return differenceInDays(Date.parse(card.updated_at), new Date()) > -7;
      });
      return { ...list, cards };
    });
  }
  if (term !== '') {
    lists = lists.map((list) => {
      const cards = list.cards.filter((card) => {
        return card.title.toLowerCase().includes(term.toLowerCase());
      });
      return { ...list, cards };
    });
  }
  if (dueThisWeek) {
    lists = lists.map((list) => {
      const cards = list.cards.filter((card) => {
        return isThisWeek(Date.parse(card.due_date));
      });
      return { ...list, cards };
    });
  }
  return lists;
};

export const selectFilteredAllLists = createSelector(
  [selectCountedLists, selectFilterRecent, selectFilterTerm, selectFilterDueThisWeek],
  filterAllFunc
);

export const selectFilteredAllBoardLists = createSelector(
  [selectCountedBoardLists, selectFilterRecent, selectFilterTerm, selectFilterDueThisWeek],
  filterAllFunc
);

export const selectFilteredAllOrderedLists = createSelector([selectFilteredAllLists], (lists) => {
  return orderBy(lists, (l) => l.order, 'asc');
});
// sort all cards by order field
export const selectFilteredAllOrderedBoardLists = createSelector(
  [selectFilteredAllBoardLists],
  (lists) => {
    return orderBy(lists, (l) => l.order, 'asc');
  }
);

export const {
  setCurrentProject,
  setFilterTerm,
  setFilterRecent,
  setFilterReset,
  setFilterDueThisWeek,
  setSortBy,
  setGroupBy,
} = projectSlice.actions;
export default projectSlice.reducer;
