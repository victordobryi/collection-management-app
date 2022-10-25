import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ICollection, ISortedCollectionsKeys } from '../../models';
import SocketContext from '../../context/SocketContext';
import { CollectionService, ItemService } from '../../API';
import { Row, Spinner } from 'react-bootstrap';
import { CollectionContainer } from '../../components';

const LargestCollections = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { collections: contextCollections } =
    useContext(SocketContext).SocketState;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const dbCollections = (await CollectionService.getCollections()).data;
        const itemsData = (await ItemService.getItems()).data;
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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, [contextCollections]);

  return (
    <>
      <h2>{t('Largest Collections')}:</h2>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <Row
          className="d-flex flex-wrap gap-3 mt-5"
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
