import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IFilter } from '../../models';
import { FormSelect } from '../../components';

const SortComponent = ({ items, setItems }: IFilter) => {
  const { t } = useTranslation();
  const [sortMode, setSortMode] = useState('Default');

  useEffect(() => {
    switch (sortMode) {
      case 'Date ↑':
        sortByDateUp();
        break;
      case 'Date ↓':
        sortByDateDown();
        break;
      case 'Name ↑':
        sortByNameUp();
        break;
      case 'Name ↓':
        sortByNameDown();
        break;
      case 'Likes ↑':
        sortByLikesUp();
        break;
      case 'Likes ↓':
        sortByLikesDown();
        break;
      case 'Comments ↑':
        sortByCommentsUp();
        break;
      case 'Comments ↓':
        sortByCommentsDown();
        break;
      default:
        sortByDefault();
    }
  }, [sortMode]);

  const sortByDefault = () => setItems(items);

  const sortByDateUp = () => {
    const newItems = [...items].sort(
      (a, b) => Number(a.data.createTime) - Number(b.data.createTime)
    );
    setItems(newItems);
    return newItems;
  };

  const sortByDateDown = () => setItems(sortByDateUp().reverse());

  const sortByNameUp = () => {
    const newItems = [...items].sort();
    setItems(newItems);
    return newItems;
  };

  const sortByNameDown = () => setItems(sortByNameUp().reverse());

  const sortByLikesUp = () => {
    const newItems = [...items].sort((a, b) => {
      const [{ count }] = a.likes;
      const [{ count: bLikes }] = b.likes;
      return Number(count) - Number(bLikes);
    });
    setItems(newItems);
    return newItems;
  };

  const sortByLikesDown = () => setItems(sortByLikesUp().reverse());

  const sortByCommentsUp = () => {
    const newItems = [...items].sort((a, b) => {
      return a.comments.length - b.comments.length;
    });
    setItems(newItems);
    return newItems;
  };

  const sortByCommentsDown = () => setItems(sortByCommentsUp().reverse());

  return (
    <FormSelect
      defaultValue="Default"
      onChange={setSortMode}
      options={[
        { value: 'Name ↑', text: t('Name') + ' ↑' },
        { value: 'Name ↓', text: t('Name') + ' ↓' },
        { value: 'Date ↑', text: t('Date') + ' ↑' },
        { value: 'Date ↓', text: t('Date') + ' ↓' },
        { value: 'Likes ↑', text: t('Likes') + ' ↑' },
        { value: 'Likes ↓', text: t('Likes') + ' ↓' },
        { value: 'Comments ↑', text: t('Comments') + ' ↑' },
        { value: 'Comments ↓', text: t('Comments') + ' ↓' },
        { value: 'Default' }
      ]}
    />
  );
};

export default SortComponent;
