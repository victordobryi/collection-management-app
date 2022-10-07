import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ItemService from '../../API/ItemsService';
import { IItem } from '../../models/IItem';
import { additionalProps } from '../CreateCollectionForm/CreateCollectionForm';

interface ModalProps {
  handleClose: () => void;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  additionalInputs: string;
}

export interface newInputsData {
  name: string;
  value: string;
}

const CreateItemForm = ({
  id,
  handleClose,
  setLoading,
  additionalInputs
}: ModalProps) => {
  const [title, setTitle] = useState('');
  const [newInputsData, setNewInputsData] = useState<newInputsData[]>([]);
  const newInputs: additionalProps[] = JSON.parse(additionalInputs);

  const createItem = async () => {
    const item: IItem = {
      title,
      likes: 0,
      id,
      createTime: Date.now(),
      additionalInputs: JSON.stringify(newInputsData)
    };
    try {
      setLoading(true);
      ItemService.addItem(item);
    } catch (error) {
      throw new Error('error');
    } finally {
      setLoading(false);
      handleClose();
      setNewInputsData([]);
    }
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
              <Form.Control
                type={type}
                onChange={(e) =>
                  setNewInputsData((values) => ({
                    ...values,
                    [name]: e.target.value
                  }))
                }
              />
            </Form.Group>
          ))}
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
