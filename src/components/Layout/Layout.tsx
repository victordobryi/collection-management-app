import React from 'react';
import ErrorWrapper from '../ErrorFallback/ErrorWrapper';
import { Header } from '../../components';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <ErrorWrapper>
        <Header />
      </ErrorWrapper>
      <main>
        <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1 p-3">
          <Outlet />
        </Container>
      </main>
      <footer>{t('Directed by Viktar Kasilkin')}</footer>
    </>
  );
};

export default Layout;
