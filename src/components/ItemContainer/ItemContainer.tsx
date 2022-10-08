import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getCurrentDate } from '../../utils/getCurrentTime';
import { newInputsData } from '../CreateItemForm/CreateItemForm';

interface test {
  [value: string]: string;
}

const ItemContainer = ({
  id,
  createTime,
  likes,
  title,
  additionalInputs
}: IItem) => {
  const data: test = JSON.parse(additionalInputs!);
  const newData: newInputsData[] = [];
  for (const k in data) {
    newData.push({ name: k, value: data[k] });
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {newData.map(({ name, value }, index) => (
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
