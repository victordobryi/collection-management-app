import React from 'react';
import { Form } from 'react-bootstrap';
import { ICommentForm } from '../../models';

const CommentForm = ({ setComment }: ICommentForm) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Text message"
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default CommentForm;
