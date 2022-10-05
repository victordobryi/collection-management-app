import React, { useEffect, useState } from 'react';
import CollectionService from '../API/CollectionService';
import { ICollection } from '../models/ICollection';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const User = () => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const collections = (await CollectionService.getCollections()).data;
        if (id) {
          const ownCollections = collections.data.filter((collection) => {
            collection.id = id;
          });
          setCollections(ownCollections);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
  }, []);
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div></div>
  );
};

export default User;
