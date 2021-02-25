import { createSlice } from '@reduxjs/toolkit';
import { taskSeed } from './seed/taskSeed';
import { computeOrder } from '@/features/shared';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    ...taskSeed,
  },
  reducers: {
    setTaskNew: (state, { payload }) => {
      if (!!state[payload.id]) {
        // TODO:  sync to backend
        console.log('Please sync the new task to the backend first');
      } else {
        state[payload.id] = payload.task;
      }
    },
    setTaskTitle: (state, { payload }) => {
      const task = state[payload.id];
      task.title = payload.title;
    },
    setTaskDescription: (state, { payload }) => {
      const task = state[payload.id];
      task.description = payload.description;
    },
    setTaskStatus: (state, { payload }) => {
      const task = state[payload.id];
      task.status = payload.status;
    },
    setTaskAssignee: (state, { payload }) => {
      const task = state[payload.id];
      task.assignee = payload.assignee;
    },
    setTaskPriority: (state, { payload }) => {
      const task = state[payload.id];
      task.priority = payload.priority;
    },
    setTaskSection: (state, { payload }) => {
      const task = state[payload.id];
      task.section = payload.section;
    },
    setTaskDuedate: (state, { payload }) => {
      const task = state[payload.id];
      task.due_date = payload.due_date;
    },
    deleteTask: (state, { payload }) => {
      delete state[payload.id];
    },
    updateCardDragged: (state, { payload }) => {
      // TODO: will reorder the card order if the order difference goes narrow
      if (
        payload.source.listIndex === payload.destination.listIndex &&
        payload.source.cardIndex === payload.destination.cardIndex
      ) {
        return;
      }
      // update the order in the same list
      const { previousCardOrder, nextCardOrder } = payload.position;
      const newOrder = computeOrder(previousCardOrder, nextCardOrder);
      const newCard = state[payload.position.cardId];
      if (newOrder !== 0) {
        newCard[payload.order] = newOrder;
      }
      console.log(payload);
      console.log(newCard);
      if (payload.source.listIndex !== payload.destination.listIndex) {
        newCard[payload.group] = payload.destination.listIndex;
      }
      return state;
    },
  },
});

export const {
  setTaskNew,
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskAssignee,
  setTaskPriority,
  setTaskSection,
  setTaskDuedate,
  deleteTask,
  updateCardDragged,
} = taskSlice.actions;

export default taskSlice.reducer;
