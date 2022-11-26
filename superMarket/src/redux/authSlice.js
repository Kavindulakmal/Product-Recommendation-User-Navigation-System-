import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    authSuccess: (state, action) => {
      state.token = action.payload;
    },
    authLogout: state => {
      state.token = '';
    },
  },
});

export const { authSuccess, authLogout } = authSlice.actions;

export default authSlice.reducer;
