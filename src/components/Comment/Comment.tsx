import React from 'react';
import { Card } from 'react-bootstrap';

interface IComment {
  username?: string;
  date: string;
  comment: string;
}

const Comment = ({ username, date, comment }: IComment) => {
  return (
    <Card style={{ width: '75%' }}>
      <Card.Body>
        <Card.Title>{username}:</Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
      <Card.Footer>{date}</Card.Footer>
    </Card>
  );
};

export default Comment;
