import React from 'react';
import { Form } from 'react-bootstrap';
import { FullData, IItem } from '../../models/IItem';

interface IFilter {
  items: FullData[];
  setItems: React.Dispatch<React.SetStateAction<FullData[]>>;
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
  };

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
    <Form.Select
      aria-label="Sorting by"
      onChange={(e) => changeSortMode(e.target.value)}
      defaultValue="Default"
    >
      <option disabled value="Default">
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
