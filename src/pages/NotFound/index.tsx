import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <section className="page_404">
      <div className="four_zero_four_bg">
        <h1>404</h1>
      </div>
      <div className="contant_box_404">
        <h3>{t(`Look like you're lost`)}</h3>
        <p>{t('The page you are looking for not avaible!')}</p>
        <Link to="/home" className="link_404">
          {t('Go to Home')}
        </Link>
      </div>
    </section>
  );
};
export default NotFound;
