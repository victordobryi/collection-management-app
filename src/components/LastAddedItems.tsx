import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ItemService from '../API/ItemsService';
import SocketContext from '../context/SocketContext';
import { IItem } from '../models/IItem';
import ItemContainer from './ItemContainer/ItemContainer';

const LastAddedItems = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { items: contextItems } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        const currentItems = itemsData.data.sort(
          (a, b) => Number(b.createTime) - Number(a.createTime)
        );
        setItems(currentItems);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [contextItems]);

  return (
    <Row className="d-flex flex-wrap gap-3 mt-5 last-added">
      <h2>Last Added Items:</h2>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        items.map(
          (
            {
              createTime,
              likes,
              title,
              additionalInputs,
              img,
              collectionId,
              id
            },
            index
          ) =>
            index < 5 ? (
              <ItemContainer
                key={index}
                id={id}
                likes={likes}
                title={title}
                additionalInputs={additionalInputs}
                createTime={createTime}
                collectionId={collectionId}
                img={img}
              />
            ) : null
        )
      )}
    </Row>
  );
};

export default LastAddedItems;
