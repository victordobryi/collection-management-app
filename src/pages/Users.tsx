import React, { useEffect, useState } from 'react';
import UserService from '../API/UserService';
import UserContainer from '../components/UserContainer/UserContainer';
import { IUser } from '../models/IUser';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { authSlice } from '../store/reducers/auth';
import { Row, Spinner } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { setLoading } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading(true));
        const users = (await UserService.getUsers()).data;
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchUsers();
  }, []);
  return (
    <Row className="d-flex flex-wrap gap-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        users.map(({ username, id }) => (
          <UserContainer key={id} username={username} id={id} />
        ))
      )}
    </Row>
  );
};

export default Users;
