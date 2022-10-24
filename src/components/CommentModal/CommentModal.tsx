import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CommentService from '../../API/CommentService';
import SocketContext from '../../context/SocketContext';
import { IComment, ICommentModal } from '../../models';
import { useAppSelector } from '../../redux-hooks';
import { CommentForm } from '../../components';

const CommentModal = ({
  show,
  handleClose,
  currentUser,
  itemId
}: ICommentModal) => {
  const [comment, setComment] = useState('');
  const { user } = useAppSelector((state) => state.users);
  const { socket } = useContext(SocketContext).SocketState;

  const addComment = async () => {
    try {
      const newComment: IComment = {
        comment,
        fromUserId: user?.id,
        toUserId: currentUser?.id,
        toItemId: itemId!,
        currentDate: String(Date.now()),
        fromUserName: user?.username
      };
      await CommentService.addComment(newComment);
      if (socket) {
        socket.emit('add_NewComment', JSON.stringify(newComment));
      }
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
