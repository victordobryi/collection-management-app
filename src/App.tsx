import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './styles/main.scss';
import Header from './components/Header';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch } from './redux-hooks';
import { authSlice } from './store/reducers/auth';
import { useTranslation } from 'react-i18next';

export const App = () => {
  const { setAuth } = authSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    isAuth ? dispatch(setAuth(true)) : dispatch(setAuth(false));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container className="d-flex align-items-center justify-content-center flex-column">
            <AppRouter />
          </Container>
        </main>
        <footer>{t('Directed by Viktar Kasilkin')}</footer>
      </BrowserRouter>
    </>
  );
};

export default App;
