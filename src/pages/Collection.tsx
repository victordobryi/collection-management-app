import React, { useEffect, useState, useContext } from 'react';
import { Modal, Spinner, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CollectionService } from '../API';
import {
  ItemContainer,
  CreateItemForm,
  ContainerButtons,
  CollectionContainer,
  PageLayout,
  Filter,
  SortComponent,
  CollectionWrapper,
  ErrorWrapper
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
  const [error, setError] = useState<Error>();
  const { collections } = useContext(SocketContext).SocketState;
  const { byLikes, byComment, likesCount, commentsCount } = useAppSelector(
    (state) => state.filter
  );

  if (error) {
    throw new Error(error.message);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dBcollection = (await CollectionService.getCollection(String(id)))
          .data;
        if (dBcollection) {
          setAdditionalProps(String(dBcollection.data.additionalInputs));
          setCollection(dBcollection.data);
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [collections]);

  const toggleModal = () => setShow(!show);

  const isVisisble = (count: number, comments: IComment[]) =>
    ((byLikes && count > Number(likesCount)) || !byLikes) &&
    ((byComment && comments.length > Number(commentsCount)) || !byComment);

  return isLoading ? (
    <Spinner animation="border" role="status" />
  ) : (
    <>
      <ContainerButtons
        createText="Create Item"
        handleShow={toggleModal}
        userId={String(collection?.userId)}
      />
      <Row xl={12} className="d-flex justify-content-between w-100">
        {collection ? (
          <Col xl={3} md={5}>
            <CollectionContainer
              collection={collection}
              setIsLoading={setIsLoading}
            />
          </Col>
        ) : null}
        <Col xl={3} md={5}>
          <Filter items={items} setItems={setFilteredItems} />
          <SortComponent items={items} setItems={setFilteredItems} />
        </Col>
      </Row>
      <PageLayout>
        <ErrorWrapper>
          <CollectionWrapper
            setItems={setItems}
            setFilteredItems={setFilteredItems}
          >
            <>
              {filteredItems.map(({ data, likes, comments }, index) => {
                const { count } = likes;
                return (
                  isVisisble(Number(count), comments) && (
                    <ItemContainer
                      key={index}
                      data={data}
                      likes={likes}
                      comments={comments}
                    />
                  )
                );
              })}
            </>
          </CollectionWrapper>
        </ErrorWrapper>
      </PageLayout>
      <Modal show={show} onHide={toggleModal}>
        <CreateItemForm
          handleClose={toggleModal}
          collectionId={String(id)}
          userId={String(collection?.userId)}
          setLoading={setIsLoading}
          additionalInputs={additionalProps}
        />
      </Modal>
    </>
  );
};

export default Collection;
