import React, { useContext, useEffect, useState } from 'react';
import UserService from '../API/UserService';
import UserContainer from '../components/UserContainer/UserContainer';
import { IUser } from '../models/IUser';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { authSlice } from '../store/reducers/auth';
import { Row, Spinner } from 'react-bootstrap';
import SocketContext from '../context/SocketContext';

const Users = () => {
  const [usersFromDb, setUsersFromDb] = useState<IUser[]>([]);
  const { setLoading } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { users } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading(true));
        const users = (await UserService.getUsers()).data;
        setUsersFromDb(users.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsers();
  }, [users]);

  return (
    <Row className="d-flex flex-wrap gap-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        usersFromDb.map(({ username, id }) =>
          username !== 'admin' ? (
            <UserContainer key={id} username={username} id={id} />
          ) : null
        )
      )}
    </Row>
  );
};

export default Users;
