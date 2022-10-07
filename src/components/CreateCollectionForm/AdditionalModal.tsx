import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { additionalProps } from './CreateCollectionForm';

interface additionalModalProps {
  handleCloseAdditional: () => void;
  setProp: React.Dispatch<React.SetStateAction<additionalProps[]>>;
  additionalProps: additionalProps[];
}

const AdditionalModal = ({
  handleCloseAdditional,
  setProp,
  additionalProps
}: additionalModalProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('input');

  const addNewField = () => {
    const newProps = {
      name,
      type
    };
    if (additionalProps.length < 3) {
      setProp([...additionalProps, newProps]);
    }
    handleCloseAdditional();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Сhoose the name of the new property</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option disabled>Сhoose the type of the new property</option>
              <option value="input">Input</option>
              <option value="textarea">Textarea</option>
              <option value="checkbox">Checkbox</option>
              <option value="number">Number</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAdditional}>
          Close
        </Button>
        <Button variant="primary" onClick={addNewField}>
          Add new field
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AdditionalModal;
