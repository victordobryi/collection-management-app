import React from 'react';
import Main from './pages/Main';
import Container from 'react-bootstrap/Container';
import './styles/main.scss';
import Header from './components/Header';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  const isAuth = false;
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Container>
            <AppRouter isAuth={isAuth} />
          </Container>
        </main>
        <footer>Directed by Viktar Kasilkin</footer>
      </BrowserRouter>
    </>
  );
};

export default App;
