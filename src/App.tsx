import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './styles/main.scss';
import Header from './components/Header';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useAppSelector } from './redux-hooks';

export const App = () => {
  const { isLoading } = useAppSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Container className="d-flex align-items-center justify-content-center flex-column">
              <AppRouter />
            </Container>
          )}
        </main>
        <footer>Directed by Viktar Kasilkin</footer>
      </BrowserRouter>
    </>
  );
};

export default App;
