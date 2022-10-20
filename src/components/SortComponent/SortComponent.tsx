import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { IItem } from '../../models/IItem';

interface IFilter {
  items: IItem[];
  setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const SortComponent = ({ items, setItems }: IFilter) => {
  const changeSortMode = (mode: string) => {
    switch (mode) {
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
      default:
        sortByDefault();
    }
  };

  const sortByDefault = () => setItems(items);

  const sortByDateUp = () => {
    const newItems = [...items].sort(
      (a, b) => Number(a.createTime) - Number(b.createTime)
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

  return (
    <Form.Select
      aria-label="Sorting by"
      onChange={(e) => changeSortMode(e.target.value)}
    >
      <option selected disabled value="Default">
        Sorting by
      </option>
      <option value="Name ↑">Name ↑</option>
      <option value="Name ↓">Name ↓</option>
      <option value="Date ↑">Date ↑</option>
      <option value="Date ↓">Date ↓</option>
      <option value="Likes ↑">Likes ↑</option>
      <option value="Likes ↓">Likes ↓</option>
      <option value="Comments ↑">Comments ↑</option>
      <option value="Comments ↓">Comments ↓</option>
      <option value="Default">Default</option>
    </Form.Select>
  );
};

export default SortComponent;
