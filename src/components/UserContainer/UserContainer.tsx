import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import Avatar from 'react-avatar';

const UserContainer = ({ username, id }: IUser) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: '10rem' }}
      className="d-flex align-items-center"
      onClick={() => navigate(`/user/${id}`)}
    >
      <Card.Header
        style={{
          backgroundColor: 'transparent'
        }}
      >
        <Avatar name={username} size="100" round="50px" src="" />
      </Card.Header>
      <Card.Body
        style={{
          fontSize: '1.3rem',
          textAlign: 'center'
        }}
      >
        {username}
      </Card.Body>
    </Card>
  );
};

export default UserContainer;
