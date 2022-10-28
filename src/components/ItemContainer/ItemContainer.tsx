import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { IFullData, ITag, INewInputsData } from '../../models';
import { getCurrentDate, getNewInputsData } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { Tags, Like } from '../../components';
import './item-container.scss';
import LazyLoadImg from '../LazyLoadImg/LazyLoadImg';

const ItemContainer = ({ data, likes }: IFullData) => {
  const { id: likesId } = likes;
  const { additionalInputs, createTime, id, img, title, tags } = data;
  const [itemTags, setItemTags] = useState<ITag[]>([]);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  if (error) throw new Error(error.message);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemTags = JSON.parse(String(tags));
        setItemTags(itemTags);
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
    };
    fetchData();
  }, []);

  const newData: INewInputsData[] = getNewInputsData(
    JSON.parse(String(additionalInputs))
  );

  const goToItem = () => navigate(`/item/${id}`);

  return (
    <Card className="card-container">
      <LazyLoadImg
        image={String(img)}
        className="card-img"
        onClick={goToItem}
      />
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
