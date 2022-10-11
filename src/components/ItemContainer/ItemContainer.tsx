import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getCurrentDate } from '../../utils/getCurrentTime';
import { newInputsData } from '../CreateItemForm/CreateItemForm';
import { useNavigate } from 'react-router-dom';
import './item-container.scss';

export interface Data {
  [value: string]: string;
}

const ItemContainer = ({
  id,
  createTime,
  likes,
  title,
  additionalInputs,
  img
}: IItem) => {
  const data: Data = JSON.parse(additionalInputs!);
  const newData: newInputsData[] = [];
  for (const k in data) {
    newData.push({ name: k, value: data[k] });
  }

  const navigate = useNavigate();

  const goToItem = () => navigate(`/item/${id}`);

  return (
    <Card className="card-container">
      <Card.Header
        style={{
          backgroundImage: `url(${img})`,
          height: '60%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={goToItem}
      ></Card.Header>
      <Card.Body onClick={goToItem}>
        <Card.Title>{title}</Card.Title>
        {newData.map(({ name, value }, index) => (
          <Card.Text key={index}>{`${name}: ${value}`}</Card.Text>
        ))}
      </Card.Body>
      <Button variant="primary">
        <AiOutlineHeart /> {likes}
      </Button>
      <Card.Footer onClick={goToItem}>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
