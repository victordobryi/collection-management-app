import React, { useState, useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import SocketContext from '../context/SocketContext';
import { useAppDispatch } from '../redux-hooks';
import { userSlice } from '../store/reducers/users';
import { isUser } from '../store/action-creators/users';
import { UserService } from '../API';
import { AdminPanelTable } from '../components';

const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const dispatch = useAppDispatch();
  const { users } = useContext(SocketContext).SocketState;
  const { setUsers } = userSlice.actions;

  if (error) throw new Error(error.message);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = (await UserService.getUsers()).data;
        dispatch(setUsers(users.data));
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
    dispatch(isUser);
  }, [users]);

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <AdminPanelTable />
      )}
    </>
  );
};

export default AdminPanel;
