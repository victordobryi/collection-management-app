import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CommentService from '../../API/CommentService';
import { IComment } from '../../models/IComment';
import { IUser } from '../../models/IUser';
import { useAppSelector } from '../../redux-hooks';
import CommentForm from '../CommentForm/CommentForm';

interface ICommentModal {
  show: boolean;
  handleClose: () => void;
  currentUser: IUser | undefined;
}

const CommentModal = ({ show, handleClose, currentUser }: ICommentModal) => {
  const [comment, setComment] = useState('');
  const { user } = useAppSelector((state) => state.users);

  const addComment = async () => {
    try {
      const newComment: IComment = {
        comment,
        fromUserId: user?.id,
        toUserId: currentUser?.id,
        currentDate: String(Date.now()),
        fromUserName: user?.username
      };
      await CommentService.addComment(newComment);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentForm setComment={setComment} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addComment}>
          Write a comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
