import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CollectionService from '../API/CollectionService';
import ItemService from '../API/ItemsService';
import CreateItemForm from '../components/CreateItemForm/CreateItemForm';
import ItemContainer from '../components/ItemContainer/ItemContainer';
import { IItem } from '../models/IItem';
import { useTranslation } from 'react-i18next';
import SocketContext from '../context/SocketContext';

const Collection = () => {
  const { id } = useParams();
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [additionalProps, setAdditionalProps] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items: contextItems } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        const collection = (await CollectionService.getCollection(id!)).data;
        if (id) {
          const currentItems = itemsData.data.filter(
            (item) => item.collectionId === id
          );
          setItems(currentItems);
        }
        if (collection) {
          setAdditionalProps(collection.data.additionalInputs!);
          setUserId(collection.data.userId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [contextItems]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const goBack = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Container className="d-flex justify-content-between  mt-3 ">
        <Button className="align-self-start" onClick={goBack}>
          {t('Go back')}
        </Button>
        <Button className="align-self-end" onClick={handleShow}>
          {t('Create Item')}
        </Button>
      </Container>
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        <Row className="d-flex flex-wrap gap-3 mt-5 ">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            items.map(
              (
                {
                  createTime,
                  likes,
                  title,
                  additionalInputs,
                  img,
                  collectionId,
                  id
                },
                index
              ) => (
                <ItemContainer
                  key={index}
                  id={id}
                  likes={likes}
                  title={title}
                  additionalInputs={additionalInputs}
                  createTime={createTime}
                  collectionId={collectionId}
                  img={img}
                />
              )
            )
          )}
        </Row>
        <Modal show={show} onHide={handleClose}>
          <CreateItemForm
            handleClose={handleClose}
            collectionId={id!}
            setLoading={setIsLoading}
            additionalInputs={additionalProps}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Collection;
