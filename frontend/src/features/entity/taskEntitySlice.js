import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskSeed } from './seed/taskSeed';
import { computeOrder } from '@/features/shared';
import { Service as IDB } from './idb/idb';
import toast from 'react-hot-toast';

export const getAllTaskThunk = createAsyncThunk('task/getAll', async () => {
  return await IDB.getAll('tasks');
});

export const putAllTaskThunk = createAsyncThunk('task/putAll', async (tasks) => {
  return await Promise.all(
    tasks.map(async (obj) => {
      return await IDB.put('tasks', obj);
    })
  );
});
export const putTaskThunk = createAsyncThunk('task/put', async (task) => {
  return await IDB.put('tasks', task);
});
export const putNewTaskThunk = createAsyncThunk('task/putNew', async (task) => {
  return await IDB.put('tasks', task);
});
export const deleteTaskThunk = createAsyncThunk('task/delete', async (taskId) => {
  return await IDB.delete('tasks', taskId);
});

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    ...taskSeed,
  },
  reducers: {
    setTaskNew: (state, { payload }) => {
      if (!!state[payload.id]) {
        // TODO:  sync to backend console.log('Please sync the new task to the backend first');
      } else {
        state[payload.id] = payload.task;
      }
    },
    setTask: (state, { payload }) => {
      const task = state[payload.id];
      const timeNow = new Date().toISOString();
      //task.due_date = new Date(parseInt(payload.task.due_date)).toISOString();
      if (task.assignee !== payload.task.assignee) {
        task.assigned_at = timeNow;
      }
      task.title = payload.task.title;
      task.description = payload.task.description;
      task.project = payload.task.project;
      task.status = payload.task.status;
      task.section = payload.task.section;
      task.assignee = payload.task.assignee;
      task.priority = payload.task.priority;
      task.due_date = payload.task.due_date;
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
      if (payload.source.listIndex !== payload.destination.listIndex) {
        newCard[payload.group] = payload.destination.listIndex;
      }
      return state;
    },
    saveAllToLocal: () => {},
  },
  extraReducers: {
    [getAllTaskThunk.fulfilled]: (state, { payload }) => {
      if (payload) {
        payload.forEach((task) => {
          state[task.id] = task;
        });
        //console.log('bootstrap: load tasks');
      }
    },
    [putAllTaskThunk.fulfilled]: () => {
      toast.success(`All data are synced to local.`);
    },
    [putTaskThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Task #${payload} Update successfully.`);
    },
    [putNewTaskThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Task #${payload} created successfully.`);
    },
    [deleteTaskThunk.fulfilled]: (state, { payload }) => {
      toast.success(`Task deleted successfully.`);
    },
  },
});

export const {
  setTaskNew,
  setTask,
  setTaskTitle,
  setTaskDescription,
  setTaskStatus,
  setTaskAssignee,
  setTaskPriority,
  setTaskSection,
  setTaskDuedate,
  deleteTask,
  updateCardDragged,
  saveAllToLocal,
} = taskSlice.actions;

export default taskSlice.reducer;
