import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const { t } = useTranslation();

  return (
    <Form className="d-flex ms-auto">
      <InputGroup className="d-flex align-items-center">
        <Form.Control
          className="border-end-0"
          type="search"
          placeholder={t('search')}
        />
        <span>
          <Button
            variant="outline"
            className="  bg-white border-start-0 border-bottom-0 border ms-n5"
            type="button"
          >
            <AiOutlineSearch />
          </Button>
        </span>
      </InputGroup>
    </Form>
  );
};

export default Search;
