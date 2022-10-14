import React, { useEffect, useState, useContext } from 'react';
import CollectionService from '../API/CollectionService';
import { ICollection } from '../models/ICollection';
import { Container, Spinner, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CollectionContainer from '../components/CollectionContainer/CollectionContainer';
import CreateCollectionForm from '../components/CreateCollectionForm/CreateCollectionForm';
import SocketContext from '../context/SocketContext';
import UserService from '../API/UserService';
import { IUser } from '../models/IUser';
import UserContainer from '../components/UserContainer/UserContainer';
import ContainerButtons from '../components/ContainerButtons/ContainerButtons';
import PageLayout from '../components/PageLayout/PageLayout';

const User = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { collections: contextCollections, users } =
    useContext(SocketContext).SocketState;

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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, [contextCollections, users]);

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <ContainerButtons
        createText="Create Collection"
        handleShow={handleShow}
        userId={String(user?.id)}
      />
      <Container>
        {user ? (
          <UserContainer user={user} setIsLoading={setIsLoading} />
        ) : null}
      </Container>
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
          userId={id!}
          setLoading={setIsLoading}
          setIsVisible={setIsVisible}
        />
      </Modal>
    </>
  );
};

export default User;
