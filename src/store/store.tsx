import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import users from './reducers/users';
import filter from './reducers/filter';

const rootReducer = combineReducers({
  auth,
  users,
  filter
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
