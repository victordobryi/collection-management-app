import React, { useState } from 'react';
import { FullData } from '../../models/IItem';
import { useAppDispatch } from '../../redux-hooks';
import { filterSlice } from '../../store/reducers/filter';
import Search from '../Search/Search';
import FilterCheckbox from './FilterCheckbox';
import { useTranslation } from 'react-i18next';

interface IFilter {
  items: FullData[];
  setItems: React.Dispatch<React.SetStateAction<FullData[]>>;
}

const Filter = ({ items, setItems }: IFilter) => {
  const dispatch = useAppDispatch();
  const { setCommentMode, setLikeMode, setLike, setComment } =
    filterSlice.actions;
  const [likesValue, setLikesValue] = useState('5');
  const [commentsValue, setCommentsValue] = useState('5');
  const { t } = useTranslation();

  const filterByLikes = (isChecked: boolean) => {
    dispatch(setLikeMode(isChecked));
    dispatch(setLike(likesValue));
  };

  const filterByComments = (isChecked: boolean) => {
    dispatch(setCommentMode(isChecked));
    dispatch(setComment(commentsValue));
  };

  const filterByName = (value: string) => {
    const newItems = [...items].filter(({ data }) =>
      data.title?.toLocaleLowerCase().includes(value)
    );
    setItems(newItems);
  };

  return (
    <>
      <Search placeholder="Search" action={filterByName} />
      <FilterCheckbox
        setCount={setLikesValue}
        count={likesValue}
        label={`${t('More than')} ${likesValue} ${t('likes')}`}
        action={filterByLikes}
      />
      <FilterCheckbox
        count={commentsValue}
        setCount={setCommentsValue}
        label={`${t('More than')} ${commentsValue} ${t('comments')}`}
        action={filterByComments}
      />
    </>
  );
};

export default Filter;
