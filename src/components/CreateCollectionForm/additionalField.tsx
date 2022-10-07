import React from 'react';
import { Form } from 'react-bootstrap';

interface additionalField {
  type: string;
  label: string;
}

const additionalField = ({ type, label }: additionalField) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} />
    </Form.Group>
  );
};

export default additionalField;
