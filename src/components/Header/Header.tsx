import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { userLogout } from '../../store/action-creators/users';
import {
  SelectLang,
  SelectMode,
  SearchResults,
  Search
} from '../../components';
import useSearch from '../../search-hooks/useSearch';
import { ItemService } from '../../API';
import { IItem, IComment } from '../../models';

const Header = () => {
  const { isAuth, isAdmin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const id = localStorage.getItem('id');
  const [items, setItems] = useState<IItem[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const items = (await ItemService.getItems()).data.data;
        items.map(({ data }) => setItems((items) => [...items, data]));
        items.map(({ comments }) => {
          if (comments.length) {
            setComments((commentsArr) => [...commentsArr, ...comments]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const { results, searchValue, setSearchValue } = useSearch<IItem & IComment>({
    dataSet: [...items, ...comments],
    keys: ['title', 'tags', 'comment', 'fromUserName']
  });

  const searchData = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container style={{ fontSize: '18px' }}>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex ms-auto" style={{ position: 'relative' }}>
            <Search
              placeholder="Search"
              action={searchData}
              value={searchValue}
            />
            <SearchResults
              results={searchValue ? results : []}
              value={searchValue}
              setSearchValue={setSearchValue}
            />
          </Form>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
