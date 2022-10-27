import React, { useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ICollectionContainer } from '../../models';
import { mediaUploader, DeleteCollection } from '../../utils';
import { CollectionService } from '../../API';
import SocketContext from '../../context/SocketContext';
import UsePrevPage from '../../hooks/UsePrevPage';
import { useAppSelector } from '../../redux-hooks';
import { CardContainer, EditTextComponent } from '../../components';
import './collection-container.scss';

const CollectionContainer = ({
  collection,
  setIsLoading
}: ICollectionContainer) => {
  const { description, theme, title, id, img } = collection;
  const [hovered, setHovered] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: collectionId } = useParams();
  const { socket } = useContext(SocketContext).SocketState;
  const prev = UsePrevPage();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const localStorageId = localStorage.getItem('id');
  const location = useLocation();
  const section = location.pathname.split('/')[1];
  const isUser = localStorageId === collection?.userId || isAdmin;

  const goToCollection = () => {
    if (collectionId !== id) {
      navigate(`/collection/${id}`);
    }
  };

  useEffect(() => {
    if (files.length) {
      addImage();
    }
  }, [files]);

  const addImage = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const url = await mediaUploader(files, 'collections');
        await CollectionService.updateCollection({ img: url[0] }, String(id));
        if (socket) {
          socket.emit(
            'update_CurrentCollection',
            JSON.stringify({ img: url[0] })
          );
        }
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeTitle = async () => {
    try {
      await CollectionService.updateCollection({ title: newTitle }, String(id));
      if (socket) {
        socket.emit(
          'update_CurrentCollection',
          JSON.stringify({ title: newTitle })
        );
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const changeDescription = async () => {
    try {
      await CollectionService.updateCollection(
        { description: newDescription },
        String(id)
      );
      if (socket) {
        socket.emit(
          'update_CurrentCollection',
          JSON.stringify({ title: newDescription })
        );
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  };

  const deleteCollection = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        await DeleteCollection({ collectionId: String(id) });
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      } finally {
        prev.goBack();
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <CardContainer
        onClick={goToCollection}
        isOnPage={collectionId === id}
        containerName="collection"
        sectionName={section}
        isUser={isUser}
        deleteElem={deleteCollection}
        setFiles={setFiles}
        title={title}
        img={img}
        hovered={hovered}
        setHovered={setHovered}
      >
        <>
          <EditTextComponent
            hovered={hovered}
            setValue={setNewTitle}
            defaultValue={String(title)}
            value={newTitle}
            title="Title"
            isUser={isUser}
            onBlur={changeTitle}
          />
          <Card.Text>
            {t('Theme')}: {t(String(theme))}
          </Card.Text>
          <EditTextComponent
            hovered={hovered}
            setValue={setNewDescription}
            defaultValue={String(description)}
            value={newDescription}
            title="Description"
            isUser={isUser}
            onBlur={changeDescription}
            isTextArea={true}
          />
        </>
      </CardContainer>
    </>
  );
};

export default CollectionContainer;
