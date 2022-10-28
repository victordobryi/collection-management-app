import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ISearchResult, ITag } from '../../models';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-highlight-words';

const SearchResult = ({ onClick, result, value }: ISearchResult) => {
  const { t } = useTranslation();
  const { title, tags, comment, fromUserName } = result;
  const itemTags: ITag[] = tags ? JSON.parse(String(tags)) : [];
  return (
    <ListGroup.Item onClick={onClick}>
      {title && (
        <>
          <b>{t('Title')}: </b>
          <Highlighter
            searchWords={value.split('')}
            autoEscape={true}
            textToHighlight={title}
          />
          <br />
        </>
      )}
      {comment && (
        <>
          <b>{t('Comment')}: </b>{' '}
          <Highlighter
            searchWords={value.split('')}
            autoEscape={true}
            textToHighlight={comment}
          />
          <br />
        </>
      )}
      {fromUserName && (
        <>
          <b>{t('From User name')}: </b>{' '}
          <Highlighter
            searchWords={value.split('')}
            autoEscape={true}
            textToHighlight={fromUserName}
          />
          <br />
        </>
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
