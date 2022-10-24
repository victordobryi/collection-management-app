import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ISearchResults, ITag } from '../../models';

const SearchResults = ({ results, value, setSearchValue }: ISearchResults) => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToItem = (id: string) => {
    navigate(`/item/${id}`);
    setSearchValue('');
  };

  return (
    <ListGroup
      style={{ position: 'absolute', zIndex: 1, top: '60px', width: '100%' }}
    >
      {results.map(
        ({ title, tags, id, toItemId, comment, fromUserName }, index) => {
          const itemTags: ITag[] = tags ? JSON.parse(String(tags)) : [];
          return (index < 5 && !more) || (index < 10 && more) ? (
            <ListGroup.Item
              key={index}
              onClick={() => goToItem(toItemId ? toItemId : String(id))}
            >
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
          ) : (
            <></>
          );
        }
      )}
      {value && !results.length ? (
        <>
          <ListGroup.Item>{t('No data found')}</ListGroup.Item>
        </>
      ) : (
        <></>
      )}
      {results.length > 5 ? (
        <Button onClick={() => setMore(!more)}>
          {more ? t('Show Less') : t('Show More')}
        </Button>
      ) : (
        <></>
      )}
    </ListGroup>
  );
};

export default SearchResults;
