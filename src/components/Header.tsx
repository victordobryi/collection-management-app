import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Search from './Search';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { userLogout } from '../store/action-creators/users';
import SelectLang from './SelectLang/SelectLang';
import SelectMode from './SelectMode/SelectMode';

const Header = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Search />
          {!isAuth ? (
            <Nav className="ms-auto d-flex align-items-center">
              <LinkContainer to="/signup">
                <Nav.Link>SignUp</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link eventKey={2}>LogIn</Nav.Link>
              </LinkContainer>
              <SelectLang />
              <SelectMode />
            </Nav>
          ) : (
            <Nav className="ms-auto d-flex align-items-center">
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/main">
                <Nav.Link onClick={() => dispatch(userLogout())} eventKey={2}>
                  LogOut
                </Nav.Link>
              </LinkContainer>
              <SelectLang />
              <SelectMode />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
