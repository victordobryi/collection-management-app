import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete, AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { RiAdminLine } from 'react-icons/ri';
import UserService from '../../API/UserService';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { isUser } from '../../store/action-creators/users';
import { userSlice } from '../../store/reducers/users';
import './toolbar.scss';

interface IToolbar {
  checkboxes: string[];
}

const Toolbar = ({ checkboxes }: IToolbar) => {
  const dispatch = useAppDispatch();
  const { deleteUsers, blockUsers, unblockUsers, admin, notAdmin } =
    userSlice.actions;
  const { users } = useAppSelector((state) => state.users);

  const changedUsers = users.filter(
    (user, id) => checkboxes.indexOf(String(id)) !== -1
  );

  const handleDeleteUsers = async () => {
    try {
      dispatch(isUser());
      changedUsers.forEach(({ id }) => {
        UserService.deleteUser(String(id));
        dispatch(deleteUsers(String(id)));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  const toggleIsAdmin = async (state: boolean) => {
    try {
      await dispatch(isUser());
      changedUsers.forEach(({ id, password, username, isBlocked, img }) => {
        const newUser = {
          id,
          password,
          username,
          isAdmin: state,
          isBlocked,
          img
        };
        UserService.updateUser(newUser, String(id));
        state ? dispatch(admin(String(id))) : dispatch(notAdmin(String(id)));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  const toggleBlockUsers = async (state: boolean) => {
    try {
      await dispatch(isUser());
      changedUsers.forEach(({ id, password, username, isAdmin, img }) => {
        const newUser = {
          id,
          password,
          username,
          isAdmin,
          isBlocked: state,
          img
        };
        UserService.updateUser(newUser, String(id));
        state
          ? dispatch(blockUsers(String(id)))
          : dispatch(unblockUsers(String(id)));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  return (
    <ButtonGroup size="sm">
      <Button onClick={() => toggleBlockUsers(true)}>
        <AiFillLock />
      </Button>
      <Button onClick={() => toggleBlockUsers(false)}>
        <AiFillUnlock />
      </Button>
      <Button onClick={handleDeleteUsers}>
        <AiFillDelete />
      </Button>
      <Button onClick={() => toggleIsAdmin(true)}>
        <GrUserAdmin className="isAdmin" />
      </Button>
      <Button onClick={() => toggleIsAdmin(false)}>
        <RiAdminLine />
      </Button>
    </ButtonGroup>
  );
};
export default Toolbar;
