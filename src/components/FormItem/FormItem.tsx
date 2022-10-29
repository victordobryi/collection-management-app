import React from 'react';
import { Form } from 'react-bootstrap';
import { IFormItem } from '../../models';
import { useTranslation } from 'react-i18next';

const FormItem = ({ type, placeholder, onChange, label, value }: IFormItem) => {
  const { t } = useTranslation();

  const changeValue = (text: string) => {
    if (type === 'textarea') {
      onChange(text);
    } else {
      value.length < 20 ? onChange(text) : null;
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{t(label)}</Form.Label>
      <Form.Control
        type={type}
        as={type === 'textarea' ? 'textarea' : undefined}
        placeholder={t(placeholder || label)}
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      />
    </Form.Group>
  );
};

export default FormItem;
