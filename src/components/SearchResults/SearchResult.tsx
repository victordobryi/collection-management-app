import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { ISearchResult, ITag } from '../../models';
import { useTranslation } from 'react-i18next';

const SearchResult = ({ onClick, result }: ISearchResult) => {
  const { t } = useTranslation();
  const { title, tags, comment, fromUserName } = result;
  const itemTags: ITag[] = tags ? JSON.parse(String(tags)) : [];

  return (
    <ListGroup.Item onClick={onClick}>
      {title && (
        <>
          <b>{t('Title')}: </b>
          {title}
          <br />
        </>
      )}
      {comment && (
        <>
          <b>{t('Comment')}: </b> {comment}
          <br />
        </>
      )}
      {fromUserName && (
        <>
          <b>{t('From User name')}: </b> {fromUserName}
          <br />
        </>
      )}
      {itemTags.length ? (
        <>
          <b>{t('Tags')}: </b>
          {itemTags.map(({ name }, tagId) => (
            <span key={tagId}>{(tagId ? ', ' : '') + name}</span>
          ))}
        </>
      ) : (
        <></>
      )}
    </ListGroup.Item>
  );
};

export default SearchResult;
