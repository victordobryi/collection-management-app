import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import UserService from '../../API/UserService';
import SocketContext from '../../context/SocketContext';
import { IComment } from '../../models/IComment';
import { IUser } from '../../models/IUser';
import Comment from '../Comment/Comment';
import CommentModal from '../CommentModal/CommentModal';
import { useTranslation } from 'react-i18next';

interface IComments {
  userId: string | undefined;
  itemId: string | undefined;
  commentsData: IComment[];
}

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
