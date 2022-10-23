import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { IComment } from '../../models/IComment';
import { IItem } from '../../models/IItem';
import { ITag } from '../../models/ITag';

export interface ISearchResults {
  results: (IItem & IComment)[];
  value: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResults = ({ results, value, setSearchValue }: ISearchResults) => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();

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
                  <b>title: </b>
                  {title}
                  <br />
                </>
              )}
              {comment && (
                <>
                  <b>comment: </b> {comment}
                  <br />
                </>
              )}
              {fromUserName && (
                <>
                  <b>fromUserName: </b> {fromUserName}
                  <br />
                </>
              )}
              {itemTags.length ? (
                <>
                  <b>tags: </b>
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
          <ListGroup.Item>No data found</ListGroup.Item>
        </>
      ) : (
        <></>
      )}
      {results.length > 5 ? (
        <Button onClick={() => setMore(!more)}>
          Show {more ? 'Less' : 'More'}
        </Button>
      ) : (
        <></>
      )}
    </ListGroup>
  );
};

export default SearchResults;
