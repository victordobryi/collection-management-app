import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CollectionService from '../API/CollectionService';
import ItemService from '../API/ItemsService';
import CreateItemForm from '../components/CreateItemForm/CreateItemForm';
import ItemContainer from '../components/ItemContainer/ItemContainer';
import { IItem } from '../models/IItem';

const Collection = () => {
  const { id } = useParams();
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [additionalProps, setAdditionalProps] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        const collection = (await CollectionService.getCollection(id!)).data;
        if (id) {
          const currentItems = itemsData.data.filter((item) => item.id === id);
          setItems(currentItems);
        }
        if (collection) {
          setAdditionalProps(collection.data.additionalInputs!);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="d-flex align-items-center flex-column flex-grow-1 mt-3">
      <Button className="align-self-end" onClick={handleShow}>
        Create Item
      </Button>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="d-flex flex-wrap gap-3 mt-5">
          {items.map(
            ({ createTime, id, likes, title, additionalInputs }, index) => (
              <ItemContainer
                key={index}
                id={id}
                likes={likes}
                title={title}
                additionalInputs={additionalInputs}
                createTime={createTime}
              />
            )
          )}
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
        <CreateItemForm
          handleClose={handleClose}
          id={id!}
          setLoading={setIsLoading}
          additionalInputs={additionalProps}
        />
      </Modal>
    </Container>
  );
};

export default Collection;
