import React, { useState, useContext, useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { AdminPanelTable } from '../components';
import SocketContext from '../context/SocketContext';
import { useAppDispatch } from '../redux-hooks';
import { UserService } from '../API';
import { userSlice } from '../store/reducers/users';
import { isUser } from '../store/action-creators/users';

const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { users } = useContext(SocketContext).SocketState;
  const { setUsers } = userSlice.actions;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = (await UserService.getUsers()).data;
        dispatch(setUsers(users.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
    dispatch(isUser);
  }, [users]);

  return (
    <Row className="d-flex flex-wrap gap-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <AdminPanelTable />
      )}
    </Row>
  );
};

export default AdminPanel;
