import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { ICommentContainer } from '../../models';
import { getCurrentDate } from '../../utils';

const Comment = ({ username, date, comment }: ICommentContainer) => {
  return (
    <Col xxl={12}>
      <Card className="comment">
        <Card.Body>
          <Card.Title>{username}:</Card.Title>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
        <Card.Footer>{getCurrentDate(date)}</Card.Footer>
      </Card>
    </Col>
  );
};

export default Comment;
