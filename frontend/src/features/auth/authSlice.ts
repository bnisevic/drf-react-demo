// Add an empty export statement to make this file a module
export {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: string | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
