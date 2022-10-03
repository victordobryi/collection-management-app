import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';

const rootReducer = combineReducers({
  auth
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
