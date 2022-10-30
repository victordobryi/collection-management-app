import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CommentService from '../../API/CommentService';
import SocketContext from '../../context/SocketContext';
import { IComment, ICommentModal } from '../../models';
import { useAppSelector } from '../../redux-hooks';
import { CommentForm, ModalContainer } from '../../components';

const CommentModal = ({
  show,
  handleClose,
  currentUser,
  itemId
}: ICommentModal) => {
  const [comment, setComment] = useState('');
  const { user } = useAppSelector((state) => state.users);
  const { socket } = useContext(SocketContext).SocketState;
  const [error, setError] = useState<Error>();

  if (error) throw new Error(error.message);

  const addComment = async () => {
    try {
      const newComment: IComment = {
        comment,
        fromUserId: user?.id,
        toUserId: currentUser?.id,
        toItemId: String(itemId),
        currentDate: String(Date.now()),
        fromUserName: user?.username
      };
      await CommentService.addComment(newComment);
      if (socket) {
        socket.emit('add_NewComment', JSON.stringify(newComment));
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalContainer
        title="Write a comment"
        onClose={handleClose}
        onCreate={addComment}
      >
        <CommentForm setComment={setComment} />
      </ModalContainer>
    </Modal>
  );
};

export default CommentModal;
