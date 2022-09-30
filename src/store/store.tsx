import { combineReducers, configureStore } from '@reduxjs/toolkit';
import app from './reducers/app';

const rootReducer = combineReducers({
  app
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
