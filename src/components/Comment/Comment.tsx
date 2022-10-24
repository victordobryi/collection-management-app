import React from 'react';
import { Card } from 'react-bootstrap';
import { ICommentContainer } from '../../models';

const Comment = ({ username, date, comment }: ICommentContainer) => {
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
