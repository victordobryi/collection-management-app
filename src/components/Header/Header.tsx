import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SearchResults, Search, NavbarContainer } from '../../components';
import useSearch from '../../search-hooks/useSearch';
import { FullDataService } from '../../API';
import { IItem, IComment } from '../../models';
import './header.scss';
import { useAppDispatch } from '../../redux-hooks';
import { searchSlice } from '../../store/reducers/search';

const Header = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const dispatch = useAppDispatch();
  const { setSearchValue: setValue } = searchSlice.actions;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const items = (await FullDataService.getFullData()).data.data;
        items.map(({ data }) => setItems((items) => [...items, data]));
        items.map(({ comments }) => {
          if (comments.length) {
            setComments((commentsArr) => [...commentsArr, ...comments]);
          }
        });
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
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
    dispatch(setValue(value));
  };

  return (
    <Navbar expand="xl" bg="dark" variant="dark">
      <Container className="navbar__container">
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex ms-auto navbar__form">
            <Search placeholder="Search" action={searchData} />
            <SearchResults
              results={searchValue ? results : []}
              setSearchValue={setSearchValue}
            />
          </Form>
          <NavbarContainer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
