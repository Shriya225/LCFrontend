import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  accessToken: localStorage.getItem('user_access_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('user_access_token', action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem('user_access_token');
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
