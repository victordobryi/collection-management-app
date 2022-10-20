import React from 'react';
import { Form } from 'react-bootstrap';
import { IItem } from '../../models/IItem';
import { useAppDispatch } from '../../redux-hooks';
import { filterSlice } from '../../store/reducers/filter';
import Search from '../Search';
import FilterCheckbox from './FilterCheckbox';

interface IFilter {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const Filter = ({ items, setItems }: IFilter) => {
  const dispatch = useAppDispatch();
  const { setCommentMode, setLikeMode } = filterSlice.actions;

  const filterByLikes = (isChecked: boolean) =>
    dispatch(setLikeMode(isChecked));
  const filterByComments = (isChecked: boolean) =>
    dispatch(setCommentMode(isChecked));

  const filterByName = (value: string) => {
    const newItems = items.filter(({ title }) =>
      title?.toLocaleLowerCase().includes(value)
    );
    setItems(newItems);
  };

  return (
    <Form>
      <Search placeholder="Search" action={filterByName} />
      <FilterCheckbox label="More than 5 likes" action={filterByLikes} />
      <FilterCheckbox label="More than 5 comments" action={filterByComments} />
    </Form>
  );
};

export default Filter;
