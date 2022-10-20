import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import CommentService from '../../API/CommentService';
import UserService from '../../API/UserService';
import SocketContext from '../../context/SocketContext';
import { IComment } from '../../models/IComment';
import { IUser } from '../../models/IUser';
import Comment from '../Comment/Comment';
import CommentModal from '../CommentModal/CommentModal';

interface IComments {
  userId: string | undefined;
  itemId: string | undefined;
}

const Comments = ({ userId, itemId }: IComments) => {
  const [currentComments, setComments] = useState<IComment[]>([]);
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState(false);
  const { comments } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comments = (await CommentService.getComments()).data.data;
        const itemComments = comments.filter(
          ({ toItemId }) => toItemId === itemId
        );
        setComments(itemComments);
        if (userId) {
          const currentUser = (await UserService.getUser(String(userId))).data
            .data;
          if (currentUser) {
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comments]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container>
        <Button onClick={handleShow}>Write a comment</Button>
        <h2>Comments:</h2>
        <Row>
          {currentComments.map(({ comment, currentDate, fromUserName }, id) => (
            <Comment
              key={id}
              username={fromUserName}
              date={currentDate}
              comment={comment}
            />
          ))}
        </Row>
      </Container>
      <CommentModal
        show={show}
        handleClose={handleClose}
        currentUser={user}
        itemId={itemId}
      />
    </>
  );
};

export default Comments;
