import { createSlice } from '@reduxjs/toolkit';

const defaultUser = {
  id: '',
  name: '',
  email: '',
  photo_url: '',
};
const initialState = {
  isAuth: false,
  currentUser: defaultUser,
  isLoading: false,
  errors: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStart: (state, { payload }) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, { payload }) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setAuthFailed: (state, { payload }) => {
      state.errors = payload;
      state.isAuth = false;
    },
    setLogout: (state) => {
      state.isAuth = false;
      state.currentUser = defaultUser;
    },
  },
});

export const { setAuthStart, setAuthSuccess, setAuthFailed, setLogout } = authSlice.actions;

export default authSlice.reducer;
