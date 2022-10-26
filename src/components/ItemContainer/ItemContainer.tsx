import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { IFullData, ITag, INewInputsData } from '../../models';
import { getCurrentDate, getNewInputsData } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Tags, Like } from '../../components';
import './item-container.scss';

const ItemContainer = ({ data, likes }: IFullData) => {
  const { id: likesId } = likes;
  const { additionalInputs, createTime, id, img, title, tags } = data;
  const [itemTags, setItemTags] = useState<ITag[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      <Like likeId={String(likesId)} itemId={String(data.id)} />
      <Tags data={itemTags} />
      <Card.Footer onClick={goToItem}>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
