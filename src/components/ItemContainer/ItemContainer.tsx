import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getCurrentDate } from '../../utils/getCurrentTime';
import { newInputsData } from '../CreateItemForm/CreateItemForm';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Card
      style={{ width: '15rem', padding: '20px', height: '550px' }}
      onClick={() => navigate(`/item/${id}`)}
    >
      <Card.Header
        style={{
          backgroundImage: `url(${img})`,
          height: '60%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {newData.map(({ name, value }, index) => (
          <Card.Text key={index}>{`${name}: ${value}`}</Card.Text>
        ))}
        <Button variant="primary">
          <AiOutlineHeart /> {likes}
        </Button>
      </Card.Body>
      <Card.Footer>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
