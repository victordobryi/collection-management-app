import React, { useEffect, useState } from 'react';
import CollectionService from '../API/CollectionService';
import { ICollection } from '../models/ICollection';
import { Button, Container, Spinner, Row, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CollectionContainer from '../components/CollectionContainer/CollectionContainer';
import CreateCollectionForm from '../components/CreateCollectionForm/CreateCollectionForm';

const User = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsVisible(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsVisible(true);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const dbCollections = (await CollectionService.getCollections()).data;
        if (id) {
          const ownCollections = dbCollections.data.filter(
            (collection) => collection.id === id
          );
          setCollections(ownCollections);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <Container className="d-flex align-items-center flex-column flex-grow-1 mt-3">
      <Button className="align-self-end" onClick={handleShow}>
        Create Collection
      </Button>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="d-flex flex-wrap gap-3 mt-5">
          {collections.map(
            (
              { description, title, theme, img, id, additionalInputs },
              index
            ) => (
              <CollectionContainer
                key={index}
                id={id}
                description={description}
                title={title}
                theme={theme}
                img={img}
                additionalInputs={additionalInputs}
              />
            )
          )}
        </Row>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ visibility: `${isVisible ? 'visible' : 'hidden'}` }}
      >
        <CreateCollectionForm
          handleClose={handleClose}
          id={id!}
          setLoading={setIsLoading}
          setIsVisible={setIsVisible}
        />
      </Modal>
    </Container>
  );
};

export default User;
