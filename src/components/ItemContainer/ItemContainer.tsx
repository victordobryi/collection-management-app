import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {
  IFullData,
  ITag,
  INewInputsKeys,
  INewInputsData,
  ILikedUsers
} from '../../models';
import { getCurrentDate } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { LikeService } from '../../API';
import SocketContext from '../../context/SocketContext';
import { Tag } from '../../components';
import './item-container.scss';

const ItemContainer = ({ data, likes }: IFullData) => {
  const [{ count, id: likesId, likedUsers: likedUsersData }] = likes;
  const { additionalInputs, createTime, id, img, title, tags } = data;
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [itemTags, setItemTags] = useState<ITag[]>([]);
  const [isLiked, setIsLike] = useState(false);
  const userId = localStorage.getItem('id');
  const { socket } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users: ILikedUsers[] = JSON.parse(String(likedUsersData));
        setLikedUsers(users);
        const isUser = users.find(({ id }) => id === userId);
        setIsLike(isUser ? true : false);
        const itemTags = JSON.parse(String(tags));
        setItemTags(itemTags);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const inputsData: INewInputsKeys = JSON.parse(additionalInputs!);

  const newData: INewInputsData[] = [];

  for (const key in inputsData) {
    const type = key.split('+')[1];
    const name = key.split('+')[0];
    newData.push({ name: name, value: inputsData[key], type: type });
  }

  const navigate = useNavigate();

  const goToItem = () => navigate(`/item/${id}`);

  const addLike = async () => {
    const newUsers = [...likedUsers, { id: String(userId) }];
    try {
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...newUsers]),
          count: Number(count) + 1
        },
        String(likesId)
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
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...updatedUsers]),
          count: Number(count) - 1
        },
        String(likesId)
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
      {itemTags.map(({ name }, index) => (
        <Tag key={index} text={name} />
      ))}
      <Card.Footer onClick={goToItem}>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
