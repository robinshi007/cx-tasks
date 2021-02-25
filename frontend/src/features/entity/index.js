import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskEntitySlice';
import taskTypeReducer from './taskTypeEntitySlice';
import sectionReducer from './sectionEntitySlice';
import projectReducer from './projectEntitySlice';
import priorityReducer from './priorityEntitySlice';
import statusReducer from './statusEntitySlice';
import userReducer from './userEntitySlice';

const entityReducer = combineReducers({
  tasks: taskReducer,
  taskTypes: taskTypeReducer,
  sections: sectionReducer,
  projects: projectReducer,
  statuses: statusReducer,
  priorities: priorityReducer,
  users: userReducer,
});

// re-export all actions
export * from './taskEntitySlice';
export * from './taskTypeEntitySlice';
export * from './sectionEntitySlice';
export * from './projectEntitySlice';
export * from './statusEntitySlice';
export * from './priorityEntitySlice';
export * from './userEntitySlice';

export default entityReducer;
