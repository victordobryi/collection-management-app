import React from 'react';
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
  const { setCommentMode, setLikeMode } = filterSlice.actions;

  const filterByLikes = (isChecked: boolean) =>
    dispatch(setLikeMode(isChecked));
  const filterByComments = (isChecked: boolean) =>
    dispatch(setCommentMode(isChecked));

  const filterByName = (value: string) => {
    const newItems = [...items].filter(({ data }) =>
      data.title?.toLocaleLowerCase().includes(value)
    );
    setItems(newItems);
  };

  return (
    <>
      <Search placeholder="Search" action={filterByName} />
      <FilterCheckbox label="More than 5 likes" action={filterByLikes} />
      <FilterCheckbox label="More than 5 comments" action={filterByComments} />
    </>
  );
};

export default Filter;
