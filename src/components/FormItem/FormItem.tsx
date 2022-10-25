import React from 'react';
import { Form } from 'react-bootstrap';
import { IFormItem } from '../../models';
import { useTranslation } from 'react-i18next';

const FormItem = ({ type, placeholder, onChange, label }: IFormItem) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t(label)}</Form.Label>
      <Form.Control
        type={type}
        as={type === 'textarea' ? 'textarea' : undefined}
        placeholder={t(placeholder || label)}
        onChange={(e) => onChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default FormItem;
