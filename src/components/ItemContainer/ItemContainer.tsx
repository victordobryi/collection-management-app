import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getCurrentDate } from '../../utils/getCurrentTime';
import { newInputsData } from '../CreateItemForm/CreateItemForm';
import { useNavigate } from 'react-router-dom';
import './item-container.scss';
import LikeService from '../../API/LikeService';
import { ILike } from '../../models/ILike';
import SocketContext from '../../context/SocketContext';
import Avatar from 'react-avatar';

export interface Data {
  [value: string]: string;
}

export interface ILikedUsers {
  id: string;
}

const ItemContainer = ({
  id,
  createTime,
  title,
  additionalInputs,
  img
}: IItem) => {
  const [like, setLike] = useState<ILike>();
  const [count, setCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [isLiked, setIsLike] = useState(false);
  const userId = localStorage.getItem('id');
  const { socket, likes } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const likes = (await LikeService.getItems()).data.data;
        const currentLike = likes.find(({ postId }) => postId === id);
        setLike(currentLike);
        setCount(Number(currentLike?.count || 0));
        if (currentLike) {
          setLikedUsers(JSON.parse(String(currentLike?.likedUsers)));
          const users: ILikedUsers[] = JSON.parse(
            String(currentLike?.likedUsers)
          );
          const isUser = users.find(({ id }) => id === userId);
          setIsLike(isUser ? true : false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [likes]);

  const data: Data = JSON.parse(additionalInputs!);

  const newData: newInputsData[] = [];

  for (const k in data) {
    const type = k.split('+')[1];
    const name = k.split('+')[0];
    newData.push({ name: name, value: data[k], type: type });
  }

  const navigate = useNavigate();

  const goToItem = () => navigate(`/item/${id}`);

  const addLike = async () => {
    const newUsers = [...likedUsers, { id: String(userId) }];
    try {
      setCount(count + 1);
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...newUsers]),
          count: count + 1
        },
        String(like?.id)
      );
      if (socket) {
        socket.emit('add_CurrentLike', JSON.stringify({ ...newUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    const updatedUsers = [...likedUsers].filter(({ id }) => id !== userId);
    try {
      setCount(count - 1);
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...updatedUsers]),
          count: count - 1
        },
        String(like?.id)
      );
      if (socket) {
        socket.emit('remove_CurrentLike', JSON.stringify({ ...updatedUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="card-container">
      <Avatar name={title} size="250" src={img} onClick={goToItem} />
      <Card.Body onClick={goToItem}>
        <Card.Title>{title}</Card.Title>
        {newData.map(({ name, value }, index) => (
          <Card.Text key={index}>{`${name}: ${value}`}</Card.Text>
        ))}
      </Card.Body>
      <Button
        variant="primary"
        onClick={() => {
          isLiked ? removeLike() : addLike();
        }}
        style={{
          pointerEvents: userId ? 'auto' : 'none'
        }}
      >
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        {count}
      </Button>
      <Card.Footer onClick={goToItem}>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
