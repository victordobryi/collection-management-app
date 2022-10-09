import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ICollection } from '../../models/ICollection';
import { useTranslation, Trans } from 'react-i18next';

const CollectionContainer = ({
  id,
  img,
  theme,
  title,
  description
}: ICollection) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card
      onClick={() => navigate(`/collection/${id}`)}
      style={{ width: '15rem', padding: '20px', height: '450px' }}
    >
      <Card.Header
        style={{
          backgroundImage: `url(${img})`,
          height: '60%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></Card.Header>
      <Card.Body>
        <Card.Text>{`${t('Title')}: ${title}`}</Card.Text>
        <Card.Text>
          {t('Theme')}: {<Trans i18nKey={theme}>{theme}</Trans>}
        </Card.Text>
        <Card.Text>{`${t('Description')}: ${description}`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CollectionContainer;
