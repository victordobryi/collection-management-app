import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../API/ItemsService';
import { IItem } from '../models/IItem';

const Collection = () => {
  const { id } = useParams();
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        if (id) {
          const currentItems = itemsData.data.filter((item) => item.id === id);
          setItems(currentItems);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return <div></div>;
};

export default Collection;
