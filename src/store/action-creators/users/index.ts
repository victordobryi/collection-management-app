import { AppDispatch } from '../../store';
import UserService from '../../../API/UserService';
import { authSlice } from '../../reducers/auth';
import { Socket } from 'socket.io-client';

export const userLogin =
  (username: string, password: string, socket: Socket) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = (await UserService.getUsers()).data;
      const currentUser = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (currentUser && !currentUser.isBlocked) {
        const isAdmin =
          username === 'admin' && password === 'admin13233' ? true : false;
        dispatch(authSlice.actions.setAuth(true));
        isAdmin ? dispatch(authSlice.actions.setAdmin(true)) : null;
        socket.emit('add_NewUser', JSON.stringify(currentUser));
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('id', String(currentUser.id));
      } else if (currentUser?.isBlocked) {
        dispatch(authSlice.actions.setError('Юзер заблокирован!'));
      } else {
        dispatch(authSlice.actions.setError('Юзер не найден!'));
      }
      dispatch(authSlice.actions.setLoading(false));
    } catch (e) {
      dispatch(authSlice.actions.setError('Юзер не найден!'));
    }
  };

export const userLogout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('isAuth');
  localStorage.removeItem('id');
  dispatch(authSlice.actions.setAuth(false));
  dispatch(authSlice.actions.setAdmin(false));
  dispatch(authSlice.actions.setError(''));
};

export const userSignup =
  (username: string, password: string, socket: Socket) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = (await UserService.getUsers()).data;
      const loginedUser = response.data.find(
        (user) => user.username === username
      );
      if (!loginedUser) {
        const isAdmin =
          username === 'admin' && password === 'admin13233' ? true : false;
        const newUser = (
          await UserService.addUser({ username, password, img: '', isAdmin })
        ).data.data;
        dispatch(authSlice.actions.setAuth(true));
        localStorage.setItem('id', String(newUser.id));
        isAdmin ? dispatch(authSlice.actions.setAdmin(true)) : null;
        socket.emit('add_NewUser', JSON.stringify(newUser));
        localStorage.setItem('isAuth', 'true');
      } else {
        dispatch(authSlice.actions.setError('Юзер уже авторизирован!'));
      }
    } catch (error) {
      dispatch(authSlice.actions.setError('Что-то пошло не так!'));
    }
  };

export const isUser = () => async (dispatch: AppDispatch) => {
  const id = localStorage.getItem('id');
  if (id) {
    try {
      const user = (await UserService.getUser(id)).data.data;
      if (user && !user.isBlocked && !user.isAdmin) {
        null;
      } else if (user && user.isAdmin && !user.isBlocked) {
        dispatch(authSlice.actions.setAdmin(true));
      } else {
        dispatch(userLogout());
      }
    } catch (error) {
      dispatch(userLogout());
    }
  } else {
    null;
  }
};
