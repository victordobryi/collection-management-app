import React from 'react';
import { Form } from 'react-bootstrap';

interface ICommentForm {
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const CommentForm = ({ setComment }: ICommentForm) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control
          style={{ resize: 'none' }}
          as="textarea"
          placeholder="Text message"
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default CommentForm;
