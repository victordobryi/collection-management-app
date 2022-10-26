import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { ItemService, LikeService } from '../../API';
import { ILikeButton, ILikedUsers } from '../../models';
import SocketContext from '../../context/SocketContext';
import { useAppSelector } from '../../redux-hooks';

const Like = ({ likeId, itemId }: ILikeButton) => {
  const [count, setCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [isLiked, setIsLike] = useState(false);
  const localStorageId = localStorage.getItem('id');
  const { socket, likes } = useContext(SocketContext).SocketState;
  const { user } = useAppSelector((state) => state.users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = (await ItemService.getItem(itemId)).data;
        const users: ILikedUsers[] = JSON.parse(String(item.likes.likedUsers));
        setLikedUsers(users);
        const isUser = users.find(({ id }) => id === localStorageId);
        setIsLike(isUser ? true : false);
        if (likeId) {
          const likes = (await LikeService.getItem(likeId)).data.data;
          setCount(Number(likes.count ?? 0));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [likes]);

  const addLike = async () => {
    const newUsers = [...likedUsers, { id: String(localStorageId) }];
    try {
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...newUsers]),
          count: count + 1
        },
        likeId!
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
        likeId!
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
