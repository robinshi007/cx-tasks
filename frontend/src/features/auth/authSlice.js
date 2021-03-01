import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import client from '@/api/client';

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
  // const response = await client.get('/login');

  // validate on client side
  if (data && data.name && data.password && data.name === 'demo' && data.password === 'demo') {
    return {
      user: {
        id: '1',
        name: 'Demo',
        email: 'demo@test.com',
      },
    };
  } else
    return {
      error: {
        message: 'Invalid name or password',
      },
    };

  //return response;
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
        state.error = (payload && payload.error) || { message: 'Invalid user name or password.' };
      }
    },
    [loginAsyncAction.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuthed = false;
      console.log('payload', payload);
      state.error = (payload && payload.error) || { message: 'Connection error!' };
    },
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailed, setLogout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAuthed = (state) => state.auth.isAuthed;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
