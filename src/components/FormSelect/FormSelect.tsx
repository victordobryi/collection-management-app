import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IFormSelect } from '../../models';

const FormSelect = ({ onChange, defaultValue, options }: IFormSelect) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Select
        onChange={(e) => onChange(e.target.value)}
        defaultValue={t(defaultValue)}
      >
        <option disabled>{t(defaultValue)}</option>
        {options.map(({ value, text }, index) => (
          <option key={index} value={value}>
            {t(text || value)}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default FormSelect;
