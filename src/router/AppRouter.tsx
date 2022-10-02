import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';

interface IAppRouter {
  isAuth: boolean;
}

const AppRouter = ({ isAuth }: IAppRouter) => {
  return isAuth ? (
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
