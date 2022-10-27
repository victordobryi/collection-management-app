import React, { useContext, useEffect, useState } from 'react';
import {
  LargestCollections,
  LastAddedItems,
  ErrorWrapper
} from '../components';
import { Spinner } from 'react-bootstrap';
import { CollectionService, FullDataService } from '../API';
import { ICollection, IFullData, ISortedCollectionsKeys } from '../models';
import SocketContext from '../context/SocketContext';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<IFullData[]>([]);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [reset, setReset] = useState(false);
  const { items: contextItems } = useContext(SocketContext).SocketState;
  const { collections: contextCollections } =
    useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await FullDataService.getFullData()).data;
        const currentItems = itemsData.data.sort(
          (a, b) => Number(b.data.createTime) - Number(a.data.createTime)
        );
        setItems(currentItems);
        const dbCollections = (await CollectionService.getCollections()).data;
        const sortedObj = itemsData.data.reduce<ISortedCollectionsKeys>(
          (acc, { data }) => {
            acc[String(data.collectionId)] =
              (acc[String(data.collectionId)] || 0) + 1;
            return acc;
          },
          {}
        );
        const arr = [];
        for (const key in sortedObj) {
          const collection = dbCollections.data.filter(({ id }) => id === key);
          arr.push(collection[0]);
        }
        setCollections(arr);
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [contextItems, contextCollections, reset]);

  return isLoading ? (
    <Spinner animation="border" role="status" />
  ) : (
    <>
      <ErrorWrapper onReset={() => setReset(!reset)}>
        <LastAddedItems items={items} />
      </ErrorWrapper>
      <ErrorWrapper onReset={() => setReset(!reset)}>
        <LargestCollections collections={collections} />
      </ErrorWrapper>
    </>
  );
};

export default Main;
