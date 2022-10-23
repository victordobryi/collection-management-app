import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ISearch {
  placeholder: string;
  action: (value: string) => void;
  value?: string;
}

const Search = ({ placeholder, action, value }: ISearch) => {
  const { t } = useTranslation();

  return (
    <InputGroup className="d-flex ">
      <Form.Control
        className="border-end-0"
        type="search"
        placeholder={t(`${placeholder}`)}
        onChange={(e) => action(e.target.value)}
        value={value}
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
  );
};

export default Search;
