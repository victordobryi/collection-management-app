import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { IStatisticsContainer } from '../../models';

const Statistics = ({ title, children }: IStatisticsContainer) => {
  const { t } = useTranslation();

  return (
    <Row className="d-flex flex-wrap gap-3 mt-5" xl={4} lg={4} md={3} sm={2}>
      <h2>{t(title)}:</h2>
      {children}
    </Row>
  );
};

export default Statistics;
