import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ISearchResult, ITag } from '../../models';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-highlight-words';
import SearchResultItem from './SearchResultItem';
import { useAppSelector } from '../../redux-hooks';

const SearchResult = ({ onClick, result }: ISearchResult) => {
  const { t } = useTranslation();
  const { value } = useAppSelector((state) => state.search);
  const { title, tags, comment, fromUserName } = result;
  const itemTags: ITag[] = tags ? JSON.parse(String(tags)) : [];
  return (
    <ListGroup.Item onClick={onClick}>
      {title && <SearchResultItem name="Title" itemValue={title} />}
      {comment && <SearchResultItem name="Comment" itemValue={comment} />}
      {fromUserName && (
        <SearchResultItem name="From User" itemValue={fromUserName} />
      )}
      {itemTags.length ? (
        <>
          <b>{t('Tags')}: </b>
          {itemTags.map(({ name }, tagId) => (
            <Highlighter
              searchWords={value.split('')}
              autoEscape={true}
              textToHighlight={(tagId ? ', ' : '') + name}
              key={tagId}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </ListGroup.Item>
  );
};

export default SearchResult;
