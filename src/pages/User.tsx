import React, { useEffect, useState, useContext } from 'react';
import { CollectionService, UserService } from '../API';
import { ICollection, IUser } from '../models';
import { Spinner, Modal, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  CollectionContainer,
  CreateCollectionForm,
  UserContainer,
  ContainerButtons,
  PageLayout,
  ErrorWrapper
} from '../components';
import SocketContext from '../context/SocketContext';

const User = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<Error>();
  const { collections: contextCollections, users } =
    useContext(SocketContext).SocketState;

  if (error) throw new Error(error.message);

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
        const dbUser = (await UserService.getUser(String(id))).data.data;
        if (id) {
          const ownCollections = dbCollections.data.filter(
            (collection) => collection.userId === id
          );
          setCollections(ownCollections);
        }
        if (dbUser) {
          setUser(dbUser);
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, [contextCollections, users, id]);

  return isLoading ? (
    <Spinner animation="border" role="status" />
  ) : (
    <>
      <ContainerButtons
        createText="Create Collection"
        handleShow={handleShow}
        userId={String(user?.id)}
      />
      <Row xl={3} lg={3} md={2} sm={2} xs={1} className="w-100">
        {user ? (
          <ErrorWrapper>
            <UserContainer user={user} setIsLoading={setIsLoading} />
          </ErrorWrapper>
        ) : null}
      </Row>
      <PageLayout>
        <>
          {collections.map((collection, index) => (
            <CollectionContainer
              key={index}
              collection={collection}
              setIsLoading={setIsLoading}
            />
          ))}
        </>
      </PageLayout>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ visibility: `${isVisible ? 'visible' : 'hidden'}` }}
      >
        <CreateCollectionForm
          handleClose={handleClose}
          userId={String(id)}
          setLoading={setIsLoading}
          setIsVisible={setIsVisible}
        />
      </Modal>
    </>
  );
};

export default User;
