import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getCurrentDate } from '../../utils/getCurrentTime';
import { newInputsData } from '../CreateItemForm/CreateItemForm';

const ItemContainer = ({
  id,
  createTime,
  likes,
  title,
  additionalInputs
}: IItem) => {
  const data: newInputsData[] = JSON.parse(additionalInputs!);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {data.map(({ name, value }, index) => (
          <Card.Text key={index}>{`name: ${name}, value: ${value}`}</Card.Text>
        ))}
        <Button variant="primary">
          <AiOutlineHeart />
        </Button>
      </Card.Body>
      <Card.Footer>{getCurrentDate(createTime)}</Card.Footer>
    </Card>
  );
};

export default ItemContainer;
