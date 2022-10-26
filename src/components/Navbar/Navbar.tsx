import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppSelector, useAppDispatch } from '../../redux-hooks';
import { SelectLang, SelectMode } from '../../components';
import { userLogout } from '../../store/action-creators/users';

const Navbar = () => {
  const { isAuth, isAdmin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const id = localStorage.getItem('id');

  return (
    <Nav className="ms-auto d-flex align-items-center">
      {id ? (
        <LinkContainer to={`/user/${id}`}>
          <Nav.Link>{t('My page')}</Nav.Link>
        </LinkContainer>
      ) : null}
      {isAdmin ? (
        <LinkContainer to="/admin">
          <Nav.Link>{t('Admin-panel')}</Nav.Link>
        </LinkContainer>
      ) : null}
      <LinkContainer to="/users">
        <Nav.Link>{t('Users')}</Nav.Link>
      </LinkContainer>
      {!isAuth ? (
        <>
          <LinkContainer to="/signup">
            <Nav.Link>{t('SignUp')}</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link eventKey={2}>{t('LogIn')}</Nav.Link>
          </LinkContainer>
          <SelectLang />
          <SelectMode />
        </>
      ) : (
        <>
          <LinkContainer to="/main">
            <Nav.Link onClick={() => dispatch(userLogout())} eventKey={2}>
              {t('LogOut')}
            </Nav.Link>
          </LinkContainer>
          <SelectLang />
          <SelectMode />
        </>
      )}
    </Nav>
  );
};

export default Navbar;
