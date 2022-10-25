import React from 'react';
import { Alert } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { IErrorAlert } from '../../models';

const ErrorAlert = ({ setError, errorMessage }: IErrorAlert) => {
  const { t } = useTranslation();

  return (
    <Alert
      variant="danger"
      onClose={() => setError(false)}
      dismissible
      className="overlay"
    >
      <Alert.Heading>{t('Oh snap! You got an error!')}</Alert.Heading>
      <Trans i18nKey={errorMessage}>
        <p>{errorMessage}</p>
      </Trans>
    </Alert>
  );
};

export default ErrorAlert;
