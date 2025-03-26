import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Auth request actions
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Auth success actions
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    
    // Auth failure action
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    // Update user profile action
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Simple login action (shorthand for demo purposes)
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    // Simple update user action
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Export the actions
export const {
  loginRequest,
  registerRequest,
  loginSuccess,
  registerSuccess,
  authFailure,
  logout,
  updateUserProfile,
  login,
  updateUser,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer; 