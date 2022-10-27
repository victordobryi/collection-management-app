import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux-hooks';
import { RoutesName } from './routes';

interface IRequireAuth {
  children: React.ReactElement;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const { isAuth, isAdmin } = useAppSelector((state) => state.auth);

  const isLoginPath =
    location.pathname === '/login' || location.pathname === '/signup';

  if (location.pathname === '/admin' && !isAdmin) {
    return <Navigate to={RoutesName.MAIN} />;
  }

  if (isLoginPath && isAuth) {
    return <Navigate to={RoutesName.USERS} />;
  }

  if (!isAuth && !isLoginPath) {
    return <Navigate to={RoutesName.LOGIN} state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
