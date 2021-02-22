import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { differenceInDays, isThisWeek } from 'date-fns';
import { default as defaultState } from './defaultState';
import { orderBy, groupBy, map, merge } from 'lodash';
import { defaultTask } from './shared';

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
      //console.log(type, payload);
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
    setTaskNew: (state, action) => {
      const newId = action.payload.id;
      if (!!state.tasks[newId]) {
        // TODO:  sync to backend
        console.log('Please sync the new task to the backend first');
      } else {
        state.tasks[action.payload.id] = action.payload.task;
      }
      return state;
    },
    setTaskTitle: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.title = action.payload.title;
      return state;
    },
    setTaskDescription: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.description = action.payload.description;
      return state;
    },
    setTaskStatus: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.status = action.payload.status;
      return state;
    },
    setTaskAssignee: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.assignee = action.payload.assignee;
      return state;
    },
    setTaskPriority: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.priority = action.payload.priority;
      return state;
    },
    setTaskSection: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.section = action.payload.section;
      return state;
    },
    setTaskDuedate: (state, action) => {
      const task = state.tasks[action.payload.id];
      task.due_date = action.payload.due_date;
      return state;
    },
    deleteTask: (state, action) => {
      delete state.tasks[action.payload.id];
      return state;
    },
  },
});

export const selectProject = (state) => state.project;
export const selectStatus = (state) => state.project.status;
export const selectPriority = (state) => state.project.priority;
export const selectSection = (state) => state.project.section;
export const selectAssignee = (state) => state.project.assignee;
export const selectTaskById = (id, fields) => (state) => {
  let task;
  if (id === 'new') {
    task = merge(defaultTask(), fields);
  } else {
    task = state.project.tasks[id];
  }
  return {
    ...task,
    taskKindTitle: task.taskKind ? state.project.taskKind[task.taskKind.toString()].title : 'Task',
    statusText: state.project.status[task.status.toString()].title,
    assigneeName: task.assignee ? state.project.assignee[task.assignee.toString()].name : '',
    sectionTitle: task.section ? state.project.section[task.section.toString()].title : '',
    priorityTitle: task.priority ? state.project.priority[task.priority.toString()].title : '',
  };
};

export const selectAssigneeById = (id) => (state) => {
  const a = state.project.assignee[id];
  return {
    ...a,
  };
};
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
  setTaskNew,
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskAssignee,
  setTaskPriority,
  setTaskSection,
  setTaskDuedate,
  deleteTask,
} = projectSlice.actions;
export default projectSlice.reducer;
