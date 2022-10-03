import { AppDispatch } from '../../store';
import UserService from '../../../API/UserService';
import { authSlice } from '../../reducers/auth';

export const userLogin =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = (await UserService.getUsers()).data;
      const currentUser = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (currentUser && !currentUser.isBlocked) {
        dispatch(authSlice.actions.setAuth(true));
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
  dispatch(authSlice.actions.setAuth(false));
  dispatch(authSlice.actions.setError(''));
};

export const userSignup =
  (username: string, password: string, language: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = (await UserService.getUsers()).data;
      const loginedUser = response.data.find(
        (user) => user.username === username
      );
      if (!loginedUser) {
        (await UserService.addUser({ username, password, language })).data;
        dispatch(authSlice.actions.setAuth(true));
      } else {
        dispatch(authSlice.actions.setError('Юзер уже авторизирован!'));
      }
    } catch (error) {
      dispatch(authSlice.actions.setError('Что-то пошло не так!'));
    }
  };
