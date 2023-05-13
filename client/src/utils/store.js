import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";

const loadState = () => {
  try {
    const loadedState = localStorage.getItem("state");
    if (loadedState === null) return undefined;
    return JSON.parse(loadedState);
  } catch (error) {
    return undefined;
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: { auth: authSlice },
  preloadedState: persistedState,
});

const saveState = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

store.subscribe(() => {
  saveState(store.getState());
});
