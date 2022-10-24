import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IConfirmModal } from '../../models';

const ConfirmModal = ({ show, onHide, deleteFunc }: IConfirmModal) => {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Сonfirm your action')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('Are you sure you want to delete it?')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('No')}
        </Button>
        <Button variant="primary" onClick={deleteFunc}>
          {t('Yes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
