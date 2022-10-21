import React, { useState, useContext, useEffect } from 'react';
import { ICollection } from '../models/ICollection';
import SocketContext from '../context/SocketContext';
import CollectionService from '../API/CollectionService';
import ItemService from '../API/ItemsService';
import { Row, Spinner } from 'react-bootstrap';
import CollectionContainer from './CollectionContainer/CollectionContainer';

interface SortedData {
  [key: string]: number;
}

const LargestCollections = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { collections: contextCollections } =
    useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const dbCollections = (await CollectionService.getCollections()).data;
        const itemsData = (await ItemService.getItems()).data;
        const sortedObj = itemsData.data.reduce<SortedData>((acc, { data }) => {
          acc[String(data.collectionId)] =
            (acc[String(data.collectionId)] || 0) + 1;
          return acc;
        }, {});
        const arr = [];
        for (const key in sortedObj) {
          const collection = dbCollections.data.filter(({ id }) => id === key);
          arr.push(collection[0]);
        }
        setCollections(arr);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, [contextCollections]);

  return (
    <>
      <h2>Largest Collections:</h2>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row
          className="d-flex flex-wrap gap-3 mt-5 largest"
          xl={4}
          lg={4}
          md={3}
          sm={2}
        >
          {collections.map((collection, index) =>
            index < 5 ? (
              <CollectionContainer key={index} collection={collection} />
            ) : null
          )}
        </Row>
      )}
    </>
  );
};

export default LargestCollections;
