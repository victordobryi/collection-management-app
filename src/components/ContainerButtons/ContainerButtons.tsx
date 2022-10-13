import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UsePrevPage from '../../hooks/UsePrevPage';

interface IContainerButtons {
  createText?: string;
  handleShow?: () => void;
}

const ContainerButtons = ({ createText, handleShow }: IContainerButtons) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const prev = UsePrevPage();

  return (
    <Container className="d-flex justify-content-between my-3">
      <Button className="align-self-start" onClick={() => prev.goBack()}>
        {t('Go back')}
      </Button>
      {handleShow ? (
        <Button className="align-self-end" onClick={handleShow}>
          {t(`${createText}`)}
        </Button>
      ) : null}
    </Container>
  );
};

export default ContainerButtons;
