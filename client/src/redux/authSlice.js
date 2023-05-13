import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticate: false,
  user_type: "",
  token: "",
  userId: "",
};

// const state = store.getState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.authenticate = action.payload;
    },
    user_type: (state, action) => {
      state.user_type = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, {}) => {
      state.user_type = "";
      state.token = "";
      state.authenticate = false;
      state.userId = "";
    },
    userId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { loggedIn, user_type, token, logout, userId } = authSlice.actions;

// const selectAuthentication = state.auth.authenticate;

export default authSlice.reducer;
