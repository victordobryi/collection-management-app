import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IModal {
  title: string;
  children: React.ReactElement;
  onClose: () => void;
  onCreate: () => Promise<void> | void;
  closeButtonText?: string;
  createButtonText?: string;
}

const ModalContainer = ({
  title,
  children,
  onClose,
  onCreate,
  closeButtonText,
  createButtonText
}: IModal) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onClose}>
          {t(closeButtonText || 'Close')}
        </Button>
        <Button variant="primary" onClick={onCreate}>
          {t(createButtonText || title)}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ModalContainer;
