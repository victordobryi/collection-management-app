import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../models/IUser';

const UserContainer = ({ username, id }: IUser) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '10rem' }} onClick={() => navigate(`/user/${id}`)}>
      <Card.Header>{username}</Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default UserContainer;
