import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';

const CollectionContainer = ({
  id,
  img,
  theme,
  title,
  description
}: ICollection) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/collection/${id}`)}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{theme}</Card.Text>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CollectionContainer;
