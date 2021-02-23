import { combineReducers } from '@reduxjs/toolkit';

import homeReducer from '@/features/home/homeSlice';
import projectReducer from '@/features/project/projectSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  project: projectReducer,
});

export default rootReducer;
