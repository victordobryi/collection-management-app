import React, { useState } from 'react';
import { FullData } from '../../models/IItem';
import { useAppDispatch } from '../../redux-hooks';
import { filterSlice } from '../../store/reducers/filter';
import Search from '../Search';
import FilterCheckbox from './FilterCheckbox';

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
        label={`More than ${likesValue} likes`}
        action={filterByLikes}
      />
      <FilterCheckbox
        count={commentsValue}
        setCount={setCommentsValue}
        label={`More than ${commentsValue} comments`}
        action={filterByComments}
      />
    </>
  );
};

export default Filter;
