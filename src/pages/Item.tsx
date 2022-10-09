import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../API/ItemsService';

const Item = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const item = (await ItemService.getItem(id!)).data;
        if (item) {
          setCollectionId(item.data.collectionId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const goBack = () => {
    navigate(`/collection/${collectionId}`);
  };

  return (
    <>
      <Container className="d-flex justify-content-between  mt-3 ">
        <Button className="align-self-start" onClick={goBack}>
          Go back
        </Button>
      </Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1"></Container>
        </>
      )}
    </>
  );
};

export default Item;
