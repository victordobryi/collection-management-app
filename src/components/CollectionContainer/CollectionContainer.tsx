import React, { useContext, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import { useTranslation, Trans } from 'react-i18next';
import './collection-container.scss';
import { mediaUploader } from '../../utils/mediaUploader';
import CollectionService from '../../API/CollectionService';
import SocketContext from '../../context/SocketContext';
import { EditText, EditTextarea } from 'react-edit-text';
import { BsFillPencilFill } from 'react-icons/bs';
import Avatar from 'react-avatar';

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
  // const ref = useRef<HTMLTextAreaElement | null>(null);

  // const handleClick = () => {
  //   ref.current && ref.current.focus();
  // };

  const goToCollection = () => {
    if (collectionId !== id) {
      navigate(`/collection/${id}`);
    }
  };

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const target = e.target as HTMLInputElement;
        const files = [...Object.values(target.files!)];
        const url = await mediaUploader([...files], 'collections');
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
    await CollectionService.updateCollection({ title: newTitle }, String(id));
    if (socket) {
      socket.emit(
        'update_CurrentCollection',
        JSON.stringify({ title: newTitle })
      );
    }
  };

  const changeDescription = async () => {
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
  };

  return (
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
      <Card.Header>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor="avatar"
              style={{
                cursor: 'pointer',
                marginTop: '0.5rem',
                marginBottom: '0'
              }}
            >
              <Avatar name={title} size="100%" src={img} />
            </Form.Label>
            <Form.Control
              type="file"
              onChange={addImage}
              style={{ display: 'none' }}
              id="avatar"
            />
          </Form.Group>
        </Form>
      </Card.Header>
      <Card.Body>
        <div className="d-flex align-items-baseline">
          <Card.Text>{`${t('Title')}: `}</Card.Text>
          <EditText
            name="title"
            defaultValue={title}
            editButtonContent={<BsFillPencilFill />}
            editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
            showEditButton={hovered}
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
          {/* <textarea
            name="description"
            defaultValue={description}
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            onBlur={changeDescription}
            ref={ref}
            cols={30}
            rows={3}
          ></textarea> */}
          <EditTextarea
            name="description"
            defaultValue={description}
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            onBlur={changeDescription}
          />
          {hovered ? <BsFillPencilFill /> : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CollectionContainer;
