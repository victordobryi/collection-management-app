import React, { useEffect, useState, useContext } from 'react';
import { Col, Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CollectionService from '../API/CollectionService';
import ItemService from '../API/ItemsService';
import CreateItemForm from '../components/CreateItemForm/CreateItemForm';
import ItemContainer from '../components/ItemContainer/ItemContainer';
import { IItem } from '../models/IItem';
import SocketContext from '../context/SocketContext';
import ContainerButtons from '../components/ContainerButtons/ContainerButtons';
import { ICollection } from '../models/ICollection';
import CollectionContainer from '../components/CollectionContainer/CollectionContainer';
import PageLayout from '../components/PageLayout/PageLayout';
import Filter from '../components/Filter/FIlter';
import SortComponent from '../components/SortComponent/SortComponent';

const Collection = () => {
  const { id } = useParams();
  const [items, setItems] = useState<IItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [collection, setCollection] = useState<ICollection>();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [additionalProps, setAdditionalProps] = useState('');
  const { items: contextItems, collections } =
    useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        const dBcollection = (await CollectionService.getCollection(id!)).data;
        if (id) {
          const currentItems = itemsData.data.filter(
            (item) => item.collectionId === id
          );
          setItems(currentItems);
          setFilteredItems(currentItems);
        }
        if (dBcollection) {
          setAdditionalProps(dBcollection.data.additionalInputs!);
          setCollection(dBcollection.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [contextItems, collections]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <ContainerButtons
        createText="Create Item"
        handleShow={handleShow}
        userId={String(collection?.userId)}
      />
      <Container className="d-flex justify-content-between">
        {collection ? (
          <CollectionContainer
            collection={collection}
            setIsLoading={setIsLoading}
          />
        ) : null}
        <Form>
          <Filter items={items} setItems={setFilteredItems} />
          <SortComponent items={items} setItems={setFilteredItems} />
        </Form>
      </Container>
      <PageLayout>
        <>
          {filteredItems.map(
            (
              { createTime, title, additionalInputs, img, collectionId, id },
              index
            ) => (
              <ItemContainer
                key={index}
                id={id}
                title={title}
                additionalInputs={additionalInputs}
                createTime={createTime}
                collectionId={collectionId}
                img={img}
              />
            )
          )}
        </>
      </PageLayout>
      <Modal show={show} onHide={handleClose}>
        <CreateItemForm
          handleClose={handleClose}
          collectionId={id!}
          userId={String(collection?.userId)}
          setLoading={setIsLoading}
          additionalInputs={additionalProps}
        />
      </Modal>
    </>
  );
};

export default Collection;
