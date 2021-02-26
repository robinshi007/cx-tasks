import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '@/api/client';

const defaultUser = {
  id: '',
  name: '',
  email: '',
  photo_url: '',
};
const initialState = {
  isAuthed: false,
  currentUser: defaultUser,
  isLoading: false,
  error: '',
};

export const loginAsyncAction = createAsyncThunk('auth/login', async (data) => {
  console.log('request with', data);
  const response = await client.get('/login');
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStart: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }) => {
      state.currentUser = payload;
      state.isAuthed = true;
    },
    setAuthFailed: (state, { payload }) => {
      state.errors = payload;
      state.isAuthed = false;
    },
    setLogout: (state) => {
      state.currentUser = null;
      state.isAuthed = false;
    },
  },
  extraReducers: {
    [loginAsyncAction.pending]: (state) => {
      state.isLoading = true;
    },
    [loginAsyncAction.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.user && payload.user.id !== '') {
        state.currentUser = payload.user;
        state.isAuthed = true;
      } else {
        state.isAuthed = false;
      }
    },
    [loginAsyncAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthed = false;
      state.error = payload.error && payload.error.message;
    },
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailed, setLogout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAuthed = (state) => state.auth.isAuthed;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
