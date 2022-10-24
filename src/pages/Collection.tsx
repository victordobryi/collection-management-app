import React, { useEffect, useState, useContext } from 'react';
import { Container, Form, Modal, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CollectionService, ItemService } from '../API';
import {
  ItemContainer,
  CreateItemForm,
  ContainerButtons,
  CollectionContainer,
  PageLayout,
  Filter,
  SortComponent
} from '../components';
import { IFullData, IComment, ICollection } from '../models';
import SocketContext from '../context/SocketContext';
import { useAppSelector } from '../redux-hooks';

const Collection = () => {
  const { id } = useParams();
  const [items, setItems] = useState<IFullData[]>([]);
  const [filteredItems, setFilteredItems] = useState<IFullData[]>([]);
  const [collection, setCollection] = useState<ICollection>();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [additionalProps, setAdditionalProps] = useState('');
  const {
    items: contextItems,
    collections,
    likes,
    comments
  } = useContext(SocketContext).SocketState;
  const { byLikes, byComment, likesCount, commentsCount } = useAppSelector(
    (state) => state.filter
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data.data;
        const dBcollection = (await CollectionService.getCollection(id!)).data;
        if (id) {
          const currentItems = itemsData.filter(
            ({ data }) => data.collectionId === id
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
  }, [contextItems, collections, likes, comments]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isVisisble = (count: number, comments: IComment[]) =>
    ((byLikes && count > Number(likesCount)) || !byLikes) &&
    ((byComment && comments.length > Number(commentsCount)) || !byComment);

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
          {filteredItems.map(({ data, likes, comments }, index) => {
            const [{ count }] = likes;
            return isVisisble(Number(count), comments) ? (
              <ItemContainer
                key={index}
                data={data}
                likes={likes}
                comments={comments}
              />
            ) : (
              <></>
            );
          })}
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
