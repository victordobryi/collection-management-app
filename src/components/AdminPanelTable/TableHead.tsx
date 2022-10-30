import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ITableHead } from '../../models';
import './table-head.scss';

const TableHead = ({ all, setAll }: ITableHead) => {
  const { t } = useTranslation();

  return (
    <thead>
      <tr className="table-head__row">
        <th>
          <span className="hide">
            {t('select all')} {t('/deselect')}
          </span>
          <Form.Check
            type="checkbox"
            id="all"
            checked={all}
            onChange={() => setAll(!all)}
          />
        </th>
        <th>#</th>
        <th>{t('name')}</th>
        <th className="hide">{t('id')}</th>
        <th>{t('password')}</th>
        <th>{t('admin')}</th>
        <th>{t('blocked')}</th>
        <th className="hide">{t('avatar')}</th>
      </tr>
    </thead>
  );
};

export default TableHead;
