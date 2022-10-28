import React, { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ISearchResults } from '../../models';
import { SearchResult } from '../../components';
import './search-results.scss';

const SearchResults = ({ results, value, setSearchValue }: ISearchResults) => {
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const goToItem = (id: string) => {
    navigate(`/item/${id}`);
    setSearchValue('');
  };
  return (
    <ListGroup className="results__field">
      {results.map((result, index) => {
        const { id, toItemId } = result;
        return (
          ((index < 5 && !more) || (index < 10 && more)) && (
            <SearchResult
              onClick={() => goToItem(toItemId ? toItemId : String(id))}
              result={result}
              value={value}
            />
          )
        );
      })}
      {value && !results.length && (
        <ListGroup.Item>{t('No data found')}</ListGroup.Item>
      )}
      {results.length > 5 && (
        <Button onClick={() => setMore(!more)}>
          {more ? t('Show Less') : t('Show More')}
        </Button>
      )}
    </ListGroup>
  );
};

export default SearchResults;
