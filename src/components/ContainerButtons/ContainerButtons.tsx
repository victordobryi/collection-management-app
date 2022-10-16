import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UsePrevPage from '../../hooks/UsePrevPage';
import { useAppSelector } from '../../redux-hooks';

interface IContainerButtons {
  createText?: string;
  handleShow?: () => void;
  userId: string;
}

const ContainerButtons = ({
  createText,
  handleShow,
  userId
}: IContainerButtons) => {
  const { t } = useTranslation();
  const prev = UsePrevPage();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const localStorageId = localStorage.getItem('id');
  const isUserId = localStorageId === userId || isAdmin;

  return (
    <Container className="d-flex justify-content-between my-3">
      <Button className="align-self-start" onClick={() => prev.goBack()}>
        {t('Go back')}
      </Button>
      {handleShow && isUserId ? (
        <Button className="align-self-end" onClick={handleShow}>
          {t(`${createText}`)}
        </Button>
      ) : null}
    </Container>
  );
};

export default ContainerButtons;
