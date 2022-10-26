import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { authSlice } from '../store/reducers/auth';
import SocketContext from '../context/SocketContext';
import { UserService } from '../API';
import { UserContainer } from '../components';
import { IUser } from '../models';

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
        <Spinner animation="border" role="status" />
      ) : (
        usersFromDb.map((user) =>
          user.username !== 'admin' ? (
            <UserContainer key={user.id} user={user} />
          ) : null
        )
      )}
    </Row>
  );
};

export default Users;
