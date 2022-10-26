import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { IRegistrationFormItem } from '../../models';

const RegistrationFormItem = ({
  name,
  type,
  placeholder
}: IRegistrationFormItem) => {
  const { t } = useTranslation();

  return (
    <FormGroup className="mt-3">
      <Field
        name={name}
        type={type || 'text'}
        className="form-control"
        placeholder={t(placeholder)}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </FormGroup>
  );
};

export default RegistrationFormItem;
