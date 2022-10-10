import React, { useEffect, useState } from 'react';
import CollectionService from '../API/CollectionService';
import { ICollection } from '../models/ICollection';
import { Button, Container, Spinner, Row, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionContainer from '../components/CollectionContainer/CollectionContainer';
import CreateCollectionForm from '../components/CreateCollectionForm/CreateCollectionForm';
import { useTranslation } from 'react-i18next';

const User = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setIsVisible(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsVisible(true);
  };

  const goBack = () => {
    navigate('/users/');
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const dbCollections = (await CollectionService.getCollections()).data;
        if (id) {
          const ownCollections = dbCollections.data.filter(
            (collection) => collection.userId === id
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
    <>
      <Container className="d-flex justify-content-between mt-3">
        <Button className="align-self-start" onClick={goBack}>
          {t('Go back')}
        </Button>
        <Button className="align-self-end" onClick={handleShow}>
          {t('Create Collection')}
        </Button>
      </Container>
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row
            className="d-flex flex-wrap gap-3 mt-5 justify-content-center"
            xl={4}
            lg={4}
            md={3}
            sm={2}
          >
            {collections.map(
              (
                {
                  description,
                  title,
                  theme,
                  img,
                  userId,
                  additionalInputs,
                  id
                },
                index
              ) => (
                <CollectionContainer
                  key={index}
                  description={description}
                  title={title}
                  theme={theme}
                  img={img}
                  additionalInputs={additionalInputs}
                  userId={userId}
                  id={id}
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
            userId={id!}
            setLoading={setIsLoading}
            setIsVisible={setIsVisible}
          />
        </Modal>
      </Container>
    </>
  );
};

export default User;
