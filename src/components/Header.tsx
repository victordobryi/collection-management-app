import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DropdownComponent from './SelectLang/SelectLang';
import Search from './Search';
import { useAppDispatch, useAppSelector } from '../redux-hooks';
import { userLogout } from '../store/action-creators/users';

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
            <Nav className="ms-auto">
              <LinkContainer to="/signup">
                <Nav.Link>SignUp</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link eventKey={2}>LogIn</Nav.Link>
              </LinkContainer>
              <DropdownComponent />
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/main">
                <Nav.Link onClick={() => dispatch(userLogout())} eventKey={2}>
                  LogOut
                </Nav.Link>
              </LinkContainer>
              <DropdownComponent />
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
