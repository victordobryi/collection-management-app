import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { IFullData, ITag, INewInputsData, ILikedUsers } from '../../models';
import { getCurrentDate, getNewInputsData } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Tags, Like } from '../../components';
import './item-container.scss';

const ItemContainer = ({ data, likes }: IFullData) => {
  const { count, id: likesId, likedUsers: likedUsersData } = likes;
  const { additionalInputs, createTime, id, img, title, tags } = data;
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [itemTags, setItemTags] = useState<ITag[]>([]);
  const [isLiked, setIsLike] = useState(false);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

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

  const newData: INewInputsData[] = getNewInputsData(
    JSON.parse(additionalInputs!)
  );

  const goToItem = () => navigate(`/item/${id}`);

  return (
    <Card className="card-container">
      <Avatar name={title} size="250" src={img} onClick={goToItem} />
      <Card.Body onClick={goToItem}>
        <Card.Title>{title}</Card.Title>
        {newData.map(({ name, value }, index) => (
          <Card.Text key={index}>{`${name}: ${value}`}</Card.Text>
        ))}
      </Card.Body>
      <Like
        count={Number(count)}
        isLiked={isLiked}
        likeId={String(likesId)}
        likedUsers={likedUsers}
      />
      <Tags data={itemTags} />
      <Card.Footer onClick={goToItem}>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
