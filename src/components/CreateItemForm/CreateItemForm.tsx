import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ItemService from '../../API/ItemsService';
import { IItem } from '../../models/IItem';
import { mediaUploader } from '../../utils/mediaUploader';
import { additionalProps } from '../CreateCollectionForm/CreateCollectionForm';

interface ModalProps {
  handleClose: () => void;
  collectionId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  additionalInputs: string;
}

export interface newInputsData {
  name: string;
  value: string;
}

const CreateItemForm = ({
  collectionId,
  handleClose,
  setLoading,
  additionalInputs
}: ModalProps) => {
  const [title, setTitle] = useState('');
  const [newInputsData, setNewInputsData] = useState<newInputsData[]>([]);
  const newInputs: additionalProps[] = JSON.parse(additionalInputs);
  const [isChecked, setIsChecked] = useState(false);
  const [media, setMedia] = useState<File[]>([]);

  const createItem = async () => {
    handleClose();
    setLoading(true);
    const url = await mediaUploader(media, 'items');
    const item: IItem = {
      title,
      likes: 0,
      collectionId,
      img: url[0] || '',
      createTime: String(Date.now()),
      additionalInputs: JSON.stringify(newInputsData)
    };
    try {
      await ItemService.addItem(item);
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
      setNewInputsData([]);
    }
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = [...Object.values(target.files!)];
    setMedia([...files]);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
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
          {newInputs.map(({ name, type }, index) => (
            <Form.Group className="mb-3" key={index}>
              <Form.Label>{name}</Form.Label>
              {type === 'checkbox' ? (
                <Form.Check
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    setNewInputsData((values) => ({
                      ...values,
                      [name]: !isChecked
                    }));
                  }}
                />
              ) : (
                <>
                  <Form.Control
                    type={type}
                    as={type === 'textarea' ? 'textarea' : undefined}
                    onChange={(e) =>
                      setNewInputsData((values) => ({
                        ...values,
                        [name]: e.target.value
                      }))
                    }
                  />
                </>
              )}
            </Form.Group>
          ))}
          <Form.Group className="mb-3">
            <Form.Label>Add image</Form.Label>
            <Form.Control type="file" onChange={addImage} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createItem}>
          Create Item
        </Button>
      </Modal.Footer>
    </>
  );
};

export default CreateItemForm;
<div></div>;
