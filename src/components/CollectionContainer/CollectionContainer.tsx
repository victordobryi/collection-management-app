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
    <Card
      onClick={() => navigate(`/collection/${id}`)}
      style={{ width: '15rem', padding: '20px', height: '450px' }}
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
        <Card.Text>{`Title: ${title}`}</Card.Text>
        <Card.Text>{`Theme: ${theme}`}</Card.Text>
        <Card.Text>{`Description: ${description}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CollectionContainer;
