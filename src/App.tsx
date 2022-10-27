import React, { useEffect } from 'react';
import './styles/main.scss';
import { router } from './router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './redux-hooks';
import { authSlice } from './store/reducers/auth';
import { isUser } from './store/action-creators/users';

export const App = () => {
  const { setAuth } = authSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUser());
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    isAuth ? dispatch(setAuth(true)) : dispatch(setAuth(false));
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
