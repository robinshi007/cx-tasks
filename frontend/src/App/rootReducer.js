import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import homeReducer from '@/features/home/homeSlice';
import projectReducer from '@/features/project/projectSlice';
import entityReducer from '@/features/entity';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  project: projectReducer,
  entities: entityReducer,
});

export default rootReducer;
