import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SearchResults, Search, NavbarContainer } from '../../components';
import useSearch from '../../search-hooks/useSearch';
import { ItemService } from '../../API';
import { IItem, IComment } from '../../models';

const Header = () => {
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
      <Container className="navbar__container">
        <Navbar.Brand>
          <LinkContainer to="/">
            <Nav.Link>VK-app</Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form className="d-flex ms-auto navbar__form">
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
          <NavbarContainer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
