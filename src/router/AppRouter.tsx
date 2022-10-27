import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { ErrorWrapper } from '../components';
import Layout from '../components/Layout/Layout';
import { routes } from './routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {routes.map(({ path, component, loader }, index) => (
        <Route
          key={index}
          path={path}
          element={<ErrorWrapper>{component}</ErrorWrapper>}
          loader={loader}
        />
      ))}
    </Route>
  )
);
