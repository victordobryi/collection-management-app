import React from 'react';
import { Card } from 'react-bootstrap';
import { ICommentContainer } from '../../models';
import { getCurrentDate } from '../../utils';
import './comment.scss';

const Comment = ({ username, date, comment }: ICommentContainer) => {
  return (
    <Card className="comment">
      <Card.Body>
        <Card.Title>{username}:</Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
      <Card.Footer>{getCurrentDate(date)}</Card.Footer>
    </Card>
  );
};

export default Comment;
