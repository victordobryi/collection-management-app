import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../redux-hooks';
import { adminRoutes, privateRoutes, publicRoutes } from './routes';

const AppRouter = () => {
  const { isAuth, isAdmin } = useAppSelector((state) => state.auth);

  return isAuth && isAdmin ? (
    <Routes>
      {adminRoutes.map(({ path, component }, index) => (
        <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  ) : isAuth && !isAdmin ? (
    <Routes>
      {privateRoutes.map(({ path, component }, index) => (
        <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, component }, index) => (
        <Route key={index} path={path} element={component} />
      ))}
    </Routes>
  );
};

export default AppRouter;
