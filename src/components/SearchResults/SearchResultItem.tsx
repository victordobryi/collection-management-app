import React from 'react';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux-hooks';

interface ISearchResultItem {
  name: string;
  itemValue: string;
}

const SearchResultItem = ({ name, itemValue }: ISearchResultItem) => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state) => state.search);

  return (
    <>
      <b>{t(name)}: </b>
      <Highlighter
        searchWords={value.split('')}
        autoEscape={true}
        textToHighlight={itemValue}
      />
      <br />
    </>
  );
};

export default SearchResultItem;
