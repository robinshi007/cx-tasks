import { combineReducers } from '@reduxjs/toolkit';

import projectReducer from '@/features/project/projectSlice';

const rootReducer = combineReducers({
  project: projectReducer,
});

export default rootReducer;
