import { Navigate } from 'react-router-dom';
import {
  AdminPanel,
  Collection,
  Item,
  Login,
  Main,
  NotFound,
  Signup,
  User,
  Users
} from '../pages';
import { RequireAuth } from './requireAuth';
import { usersLoader } from '../pages/Users';

interface IRoutes {
  path: string;
  component: React.ReactElement;
  loader?: () => Promise<DeferredData>;
}

export enum RoutesName {
  LOGIN = '/login',
  MAIN = '/main',
  USERS = '/users',
  USER = '/user/:id',
  COLLECTION = '/collection/:id',
  ITEM = '/item/:id',
  SIGNUP = '/signup',
  ADMIN_PANEL = '/admin',
  MY_PAGE = '/user/:id'
}

export const routes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: (
      <RequireAuth>
        <Login />
      </RequireAuth>
    )
  },
  {
    path: RoutesName.SIGNUP,
    component: (
      <RequireAuth>
        <Signup />
      </RequireAuth>
    )
  },
  {
    path: RoutesName.USERS,
    component: <Users />,
    loader: usersLoader
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: RoutesName.USER,
    component: <User />
  },
  {
    path: RoutesName.USERS,
    component: <Users />
  },
  {
    path: RoutesName.ITEM,
    component: <Item />
  },
  {
    path: RoutesName.COLLECTION,
    component: <Collection />
  },
  {
    path: RoutesName.MY_PAGE,
    component: (
      <RequireAuth>
        <User />
      </RequireAuth>
    )
  },
  {
    path: RoutesName.ADMIN_PANEL,
    component: (
      <RequireAuth>
        <AdminPanel />
      </RequireAuth>
    )
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <NotFound />
  }
];
