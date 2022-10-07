import { Navigate } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import Collection from '../pages/Collection';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Error from '../pages/NotFound';
import Signup from '../pages/Signup';
import User from '../pages/User';
import Users from '../pages/Users';

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

export enum RoutesName {
  LOGIN = '/login',
  MAIN = '/main',
  USERS = '/users',
  USER = '/user/:id',
  COLLECTION = '/collection/:id',
  SIGNUP = '/signup',
  ADMIN_PANEL = '/admin'
}

export const publicRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Login />
  },
  {
    path: RoutesName.SIGNUP,
    component: <Signup />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];

export const privateRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Navigate to={RoutesName.USERS} />
  },
  {
    path: RoutesName.SIGNUP,
    component: <Navigate to={RoutesName.USERS} />
  },
  {
    path: RoutesName.USERS,
    component: <Users />
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
    path: RoutesName.COLLECTION,
    component: <Collection />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];

export const adminRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Navigate to={RoutesName.ADMIN_PANEL} />
  },
  {
    path: RoutesName.ADMIN_PANEL,
    component: <AdminPanel />
  },
  {
    path: RoutesName.USERS,
    component: <Users />
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
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];
