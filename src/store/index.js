import { configureStore } from '@reduxjs/toolkit';

import config from '@/config';
import MainReducer from '@/store/reducers';

const store = configureStore({ /** Global State Initialization */
  reducer: MainReducer,
  preloadedState: config.initial_state,
  devTools: process.env.NODE_ENV === "production" || process.env.REACT_APP_HOST_ENV === "production" ? false : true
});

store.subscribe(() => { /** Callback used to persist data in local storage if needed */
  const state = store.getState();

  localStorage.setItem("user_session", JSON.stringify(state.user_session));
  localStorage.setItem("cookiesAccepted", JSON.stringify(state.cookiesAccepted));
});

export default store;