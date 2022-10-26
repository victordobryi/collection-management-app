import React, { useEffect, useContext } from 'react';
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
        console.log(error);
      }
    };
    fetchData();
  }, [collections]);
  return <>{children}</>;
};

export default CollectionWrapper;
