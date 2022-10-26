import { Navigate } from 'react-router-dom';
import {
  AdminPanel,
  Collection,
  Item,
  Login,
  Main,
  Error,
  Signup,
  User,
  Users
} from '../pages';

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
  ITEM = '/item/:id',
  SIGNUP = '/signup',
  ADMIN_PANEL = '/admin',
  MY_PAGE = '/user/:id'
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
    path: RoutesName.ITEM,
    component: <Item />
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
    path: RoutesName.ITEM,
    component: <Item />
  },
  {
    path: RoutesName.COLLECTION,
    component: <Collection />
  },
  {
    path: RoutesName.MY_PAGE,
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
    path: RoutesName.MY_PAGE,
    component: <User />
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
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];
