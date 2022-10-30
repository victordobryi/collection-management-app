import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ISearch } from '../../models';
import { useAppSelector } from '../../redux-hooks';

const Search = ({ placeholder, action }: ISearch) => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state) => state.search);

  return (
    <InputGroup className="d-flex ">
      <Form.Control
        className="border-end-0 relative"
        type="search"
        placeholder={t(`${placeholder}`)}
        onChange={(e) => action(e.target.value)}
        value={value}
      />
      <Button
        variant="outline"
        className="  bg-white border-start-0 border-bottom-0 border ms-n5"
        type="button"
      >
        <AiOutlineSearch />
      </Button>
    </InputGroup>
  );
};

export default Search;
