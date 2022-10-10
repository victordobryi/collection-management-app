import React, { useState, useContext } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CollectionService from '../../API/CollectionService';
import { ICollection } from '../../models/ICollection';
import { mediaUploader } from '../../utils/mediaUploader';
import AdditionalModal from './AdditionalModal';
import SocketContext from '../../context/SocketContext';

interface ModalProps {
  handleClose: () => void;
  userId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface additionalProps {
  name: string;
  type: string;
}

const CreateCollectionForm = ({
  handleClose,
  userId,
  setLoading,
  setIsVisible
}: ModalProps) => {
  const [theme, setTheme] = useState('Comics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [additionalProps, setAdditionalProps] = useState<additionalProps[]>([]);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const [active, setActive] = useState(false);
  const { socket } = useContext(SocketContext).SocketState;

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  const createCollection = async () => {
    setLoading(true);
    handleClose();
    const url = await mediaUploader(media, 'collections');
    const collection: ICollection = {
      title,
      description,
      theme,
      userId,
      img: url[0] || '',
      additionalInputs: JSON.stringify(additionalProps)
    };
    try {
      await CollectionService.addCollection(collection);
      if (socket) {
        socket.emit('add_NewCollection', JSON.stringify(collection));
      }
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAdditional = () => {
    setActive(false);
    setIsVisible(true);
  };
  const handleShowAdditional = () => {
    setActive(true);
    setIsVisible(false);
  };

  return (
    <>
      <Modal show={active} onHide={handleCloseAdditional}>
        <AdditionalModal
          handleCloseAdditional={handleCloseAdditional}
          setProp={setAdditionalProps}
          additionalProps={additionalProps}
        />
      </Modal>
      <Modal.Header closeButton>
        <Modal.Title>{t('Create Collection')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t('Title')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('Title')}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('Description')}</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={t('Description')}
              style={{ resize: 'none' }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => setTheme(e.target.value)}>
              <option disabled>{t('Select a category')}</option>
              <option value="Comics">{t('Comics')}</option>
              <option value="Card">{t('Cards')}</option>
              <option value="Figures">{t('Figures')}</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('Add image')}</Form.Label>
            <Form.Control type="file" onChange={addImage} />
          </Form.Group>
          <Button
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            className="d-flex gx-0"
            variant="dark"
            onClick={handleShowAdditional}
            disabled={additionalProps.length < 3 ? false : true}
          >
            +
          </Button>
          <Form.Text>
            {`${t('Additional Props')} (${t('max')} 3): ${additionalProps.map(
              ({ name, type }) =>
                ` ${t('Name')}: ${name} - ${t('Type')}: ${type}`
            )}`}
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          {t('Close')}
        </Button>
        <Button variant="primary" onClick={createCollection}>
          {t('Create Collection')}
        </Button>
      </Modal.Footer>
      {error ? (
        <Alert
          variant="danger"
          onClose={() => setError(false)}
          dismissible
          className="overlay"
        >
          <Alert.Heading>{t('Oh snap! You got an error!')}</Alert.Heading>
          <p>{t('You can add only an image')}</p>
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateCollectionForm;
