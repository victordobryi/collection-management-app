import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { IStatisticsContainer } from '../../models';
import './statistics.scss';

const Statistics = ({ title, children }: IStatisticsContainer) => {
  const { t } = useTranslation();

  return (
    <div className="w-100">
      <h2 className="mt-5 statistics__title">{t(title)}:</h2>
      <Row className="mt-3 statistics__row" xl={5} lg={4} md={3} sm={2} xs={1}>
        {children}
      </Row>
    </div>
  );
};

export default Statistics;
