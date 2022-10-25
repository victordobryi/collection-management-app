import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import UserService from '../../API/UserService';
import SocketContext from '../../context/SocketContext';
import { IComments, IUser } from '../../models';
import { Comment, CommentModal } from '../../components';
import { useTranslation } from 'react-i18next';

const Comments = ({ userId, itemId, commentsData }: IComments) => {
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState(false);
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
          {commentsData.map(({ comment, currentDate, fromUserName }, id) => (
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
