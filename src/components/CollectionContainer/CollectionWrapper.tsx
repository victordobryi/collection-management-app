import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FullDataService } from '../../API';
import { ICollectionWrapper } from '../../models';
import SocketContext from '../../context/SocketContext';

const CollectionWrapper = ({
  setItems,
  setFilteredItems,
  children
}: ICollectionWrapper) => {
  const { id } = useParams();
  const { collections } = useContext(SocketContext).SocketState;
  const [error, setError] = useState<Error>();

  if (error) throw new Error(error.message);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = (await FullDataService.getFullData()).data.data;
        if (id) {
          const currentItems = itemsData.filter(
            ({ data }) => data.collectionId === id
          );
          setItems(currentItems);
          setFilteredItems(currentItems);
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
    };
    fetchData();
  }, [collections]);
  return <>{children}</>;
};

export default CollectionWrapper;
