import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CollectionService from '../../API/CollectionService';
import { ICollection } from '../../models/ICollection';
import { mediaUploader } from '../../utils/mediaUploader';
import AdditionalModal from './AdditionalModal';

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
  const [theme, setTheme] = useState('comics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [additionalProps, setAdditionalProps] = useState<additionalProps[]>([]);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const [active, setActive] = useState(false);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  const createCollection = async () => {
    const url = await mediaUploader(media);
    setUrl(url[0]);
    const collection: ICollection = {
      title,
      description,
      theme,
      userId,
      img: url[0],
      additionalInputs: JSON.stringify(additionalProps)
    };
    try {
      setLoading(true);
      CollectionService.addCollection(collection);
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
      handleClose();
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
        <Modal.Title>Create Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              style={{ resize: 'none' }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => setTheme(e.target.value)}>
              <option disabled>Open this select menu</option>
              <option value="comics">Comics</option>
              <option value="card">Cards</option>
              <option value="figure">Figures</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Add image</Form.Label>
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
            {`Additional Props (max 3): ${additionalProps.map(
              ({ name, type }) => ` Name: ${name} - Type: ${type}`
            )}`}
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createCollection}>
          Create Collection
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
