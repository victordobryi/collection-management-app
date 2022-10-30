import React, { useContext, useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import UserService from '../../API/UserService';
import SocketContext from '../../context/SocketContext';
import { IComment, IComments, IUser } from '../../models';
import { Comment, CommentModal, ErrorWrapper } from '../../components';
import { useTranslation } from 'react-i18next';
import { CommentService } from '../../API';

const Comments = ({ userId, itemId }: IComments) => {
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<Error>();
  const [currentComments, setCurrentComments] = useState<IComment[]>([]);
  const { comments } = useContext(SocketContext).SocketState;
  const { t } = useTranslation();

  if (error) throw new Error(error.message);

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
        if (error instanceof Error) setError(error);
      }
    };
    fetchData();
  }, [comments]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="flex-grow-1 w-100">
        <Button onClick={handleShow}>{t('Write a comment')}</Button>
        <h2>{t('Comments')}:</h2>
        <Row className="w-100">
          {currentComments.map(({ comment, currentDate, fromUserName }, id) => (
            <Comment
              key={id}
              username={fromUserName}
              date={currentDate}
              comment={comment}
            />
          ))}
        </Row>
      </div>
      <ErrorWrapper>
        <CommentModal
          show={show}
          handleClose={handleClose}
          currentUser={user}
          itemId={itemId}
        />
      </ErrorWrapper>
    </>
  );
};

export default Comments;
