import React, { useContext, useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import { useTranslation, Trans } from 'react-i18next';
import './collection-container.scss';
import { mediaUploader } from '../../utils/mediaUploader';
import CollectionService from '../../API/CollectionService';
import SocketContext from '../../context/SocketContext';
import { EditText, EditTextarea } from 'react-edit-text';
import Avatar from 'react-avatar';
import { AiOutlineClose } from 'react-icons/ai';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { DeleteCollection } from '../../utils/deleteData';
import UsePrevPage from '../../hooks/UsePrevPage';
import { useAppSelector } from '../../redux-hooks';
import { DropImageZone } from '../DropImageZone/DropImageZone';

interface ICollectionContainer {
  collection: ICollection;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionContainer = ({
  collection,
  setIsLoading
}: ICollectionContainer) => {
  const { description, theme, title, id, img } = collection;
  const [hovered, setHovered] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: collectionId } = useParams();
  const { socket } = useContext(SocketContext).SocketState;
  const [show, setShow] = useState(false);
  const prev = UsePrevPage();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const localStorageId = localStorage.getItem('id');
  const location = useLocation();
  const section = location.pathname.split('/')[1];
  const isUserId = localStorageId === collection?.userId || isAdmin;
  const [files, setFiles] = useState<File[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };

  const deleteCollection = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        await DeleteCollection({ collectionId: String(id) });
      } catch (error) {
        console.log(error);
      } finally {
        prev.goBack();
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Card
        onClick={goToCollection}
        style={{
          width: '10rem',
          cursor: collectionId === id ? 'default' : 'pointer'
        }}
        className="p-3"
        onMouseEnter={() => (collectionId === id ? setHovered(true) : null)}
        onMouseLeave={() => setHovered(false)}
      >
        <AiOutlineClose
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            visibility: hovered && isUserId ? 'visible' : 'hidden',
            cursor: 'pointer'
          }}
          onClick={handleShow}
        />
        <Card.Header>
          <Form
            style={{
              pointerEvents:
                isUserId && section === 'collection' ? 'auto' : 'none',
              position: 'relative'
            }}
          >
            <Avatar name={title} size="130" src={img} />
            <DropImageZone setFiles={setFiles} isVisible={false} />
          </Form>
        </Card.Header>
        <Card.Body style={{ pointerEvents: isUserId ? 'auto' : 'none' }}>
          <div className="d-flex align-items-baseline">
            <Card.Text>{`${t('Title')}: `}</Card.Text>
            <EditText
              name="title"
              defaultValue={title}
              editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
              showEditButton={hovered && isUserId}
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              onBlur={changeTitle}
            />
          </div>
          <Card.Text>
            {t('Theme')}: {<Trans i18nKey={theme}>{theme}</Trans>}
          </Card.Text>
          <div className="d-flex align-items-baseline">
            <Card.Text>{`${t('Description')}:`}</Card.Text>
            <EditTextarea
              name="description"
              defaultValue={description}
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              onBlur={changeDescription}
            />
          </div>
        </Card.Body>
      </Card>
      <ConfirmModal
        show={show}
        onHide={handleClose}
        deleteFunc={deleteCollection}
      />
    </>
  );
};

export default CollectionContainer;
