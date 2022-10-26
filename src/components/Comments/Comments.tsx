import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import UserService from '../../API/UserService';
import SocketContext from '../../context/SocketContext';
import { IComment, IComments, IUser } from '../../models';
import { Comment, CommentModal } from '../../components';
import { useTranslation } from 'react-i18next';
import { CommentService } from '../../API';

const Comments = ({ userId, itemId }: IComments) => {
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState(false);
  const [currentComments, setCurrentComments] = useState<IComment[]>([]);
  const { comments } = useContext(SocketContext).SocketState;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const currentUser = (await UserService.getUser(String(userId))).data
            .data;
          setUser(currentUser);
        }
        const allComments = (await CommentService.getComments()).data.data;
        const currentComments = allComments.filter(
          ({ toItemId }) => toItemId === itemId
        );
        setCurrentComments(
          currentComments.sort(
            (a, b) => Number(a.currentDate) - Number(b.currentDate)
          )
        );
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
        <Button onClick={handleShow}>{t('Write a comment')}</Button>
        <h2>{t('Comments')}:</h2>
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
