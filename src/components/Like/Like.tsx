import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { LikeService } from '../../API';
import { ILikeButton } from '../../models';
import SocketContext from '../../context/SocketContext';
import { useAppSelector } from '../../redux-hooks';

const Like = ({ isLiked, likedUsers, count, likeId }: ILikeButton) => {
  const localStorageId = localStorage.getItem('id');
  const { socket } = useContext(SocketContext).SocketState;
  const { user } = useAppSelector((state) => state.users);

  const addLike = async () => {
    const newUsers = [...likedUsers, { id: String(localStorageId) }];
    try {
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...newUsers]),
          count: count + 1
        },
        likeId
      );
      if (socket) {
        socket.emit('add_CurrentLike', JSON.stringify({ ...newUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    const updatedUsers = [...likedUsers].filter(
      ({ id }) => id !== localStorageId
    );
    try {
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...updatedUsers]),
          count: count - 1
        },
        likeId
      );
      if (socket) {
        socket.emit('remove_CurrentLike', JSON.stringify({ ...updatedUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="primary"
      className="my-3"
      onClick={() => {
        isLiked ? removeLike() : addLike();
      }}
      style={{
        pointerEvents: user.id ? 'auto' : 'none'
      }}
    >
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      {count}
    </Button>
  );
};

export default Like;
