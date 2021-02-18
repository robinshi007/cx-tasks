import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { differenceInDays, isThisWeek } from 'date-fns';
import { default as defaultState } from './defaultState';
import { orderBy, groupBy, map } from 'lodash';

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
    updateListDragged: (state, { type, payload }) => {
      //console.log(type, payload);
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
      const newList = state[payload.group][payload.position.listId];
      newList[payload.order] = newOrder;
      return state;
    },
    updateCardDragged: (state, { type, payload }) => {
      console.log(type, payload);
      if (
        payload.source.listIndex === payload.destination.listIndex &&
        payload.source.cardIndex === payload.destination.cardIndex
      ) {
        return;
      }
      let newOrder = 0;
      const step = 100;
      // update the order in the same list
      const { previousCardOrder, nextCardOrder } = payload.position;
      if (previousCardOrder === 0 && nextCardOrder !== 0) {
        newOrder = nextCardOrder - step;
      } else if (previousCardOrder !== 0 && nextCardOrder === 0) {
        newOrder = previousCardOrder + step;
      } else if (previousCardOrder !== 0 && nextCardOrder !== 0) {
        newOrder = Math.floor((previousCardOrder + nextCardOrder) / 2);
      }
      const newCard = state.tasks[payload.position.cardId];
      if (newOrder !== 0) {
        newCard[payload.order] = newOrder;
      }
      if (payload.source.listIndex !== payload.destination.listIndex) {
        newCard[payload.group] = parseInt(payload.destination.listIndex);
      }
      return state;
    },
    setFilterTerm: (state, action) => {
      state.filters.filterTerm = action.payload;
      return state;
    },
    setFilterRecent: (state, action) => {
      state.filters.filterRecent = action.payload;
      return state;
    },
    setFilterDueThisWeek: (state, action) => {
      state.filters.filterDueThisWeek = action.payload;
      return state;
    },
    setSortBy: (state, action) => {
      state.sortBy = { field: action.payload, direction: 'asc' };
      return state;
    },
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
      return state;
    },
    setFilterReset: (state) => {
      state.filters = defaultFilters;
      return state;
    },
  },
});

export const selectProject = (state) => state.project;
export const selectStatus = (state) => state.project.status;
export const selectSection = (state) => state.project.section;
export const selectAssignee = (state) => state.project.assignee;
export const selectTasks = (state) => {
  return map(state.project.tasks, (t) => {
    return {
      ...t,
      taskKindTitle: t.taskKind ? state.project.taskKind[t.taskKind.toString()].title : 'Task',
      statusText: state.project.status[t.status.toString()].title,
      assigneeName: t.assignee ? state.project.assignee[t.assignee.toString()].name : '',
      sectionTitle: t.section ? state.project.section[t.section.toString()].title : '',
      priorityTitle: t.priority ? state.project.priority[t.priority.toString()].title : '',
    };
  });
};
export const selectGroupBy = (state) => state.project.groupBy;
export const selectSortBy = (state) => state.project.sortBy;
export const selectTasksSortBy = createSelector([selectTasks, selectSortBy], (tasks, sort) => {
  console.log(tasks);
  if (sort && sort.field !== '' && sort.direction !== '') {
    if (sort.field === 'none') {
      return orderBy(Object.values(tasks), (t) => t.order, 'asc');
    } else {
      return orderBy(Object.values(tasks), (t) => t[sort.field], sort.direction);
    }
  } else {
    return orderBy(Object.values(tasks), (t) => t.order, 'asc');
  }
});
export const selectTasksGroupBy = createSelector(
  [selectTasksSortBy, selectGroupBy],
  (tasks, group) => {
    if (group && group !== '') {
      return groupBy(Object.values(tasks), group);
    } else {
      return groupBy(Object.values(tasks), 'section');
    }
  }
);
export const selectTasksGroupByStatus = createSelector([selectTasks], (tasks) => {
  return groupBy(
    orderBy(Object.values(tasks), (t) => t.bdorder, 'asc'),
    'status'
  );
});
export const selectFilterTerm = (state) => state.project.filters.filterTerm;
export const selectFilterRecent = (state) => state.project.filters.filterRecent;
export const selectFilterDueThisWeek = (state) => state.project.filters.filterDueThisWeek;

export const selectCountedLists = createSelector(
  [selectGroupBy, selectTasksGroupBy, selectSection, selectAssignee],
  (group, lists, section, assignee) => {
    let selectedGrouped;
    if (group === 'section') {
      selectedGrouped = section;
    } else if (group === 'assignee') {
      selectedGrouped = assignee;
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
        id: parseInt(groupId),
        title,
        cards,
        count,
        order,
      };
    });
  }
);
export const selectCountedBoardLists = createSelector(
  [selectStatus, selectTasksGroupByStatus],
  (status, lists) => {
    return Object.keys(status).map((statusId) => {
      let cards = [];
      if (lists[statusId]) {
        cards = Object.values(lists[statusId]);
      }
      const count = cards.length;
      const title = status[statusId] && status[statusId].title;
      const order = status[statusId] && status[statusId].order;
      return {
        id: parseInt(statusId),
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
  updateCardDragged,
  updateListDragged,
  setFilterTerm,
  setFilterRecent,
  setFilterReset,
  setFilterDueThisWeek,
  setSortBy,
  setGroupBy,
} = projectSlice.actions;
export default projectSlice.reducer;
