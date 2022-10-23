import React, { useContext, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import ItemService from '../../API/ItemsService';
import SocketContext from '../../context/SocketContext';
import { FullData } from '../../models/IItem';
import ItemContainer from '../ItemContainer/ItemContainer';
import { useTranslation } from 'react-i18next';

const LastAddedItems = () => {
  const [items, setItems] = useState<FullData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { items: contextItems } = useContext(SocketContext).SocketState;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const itemsData = (await ItemService.getItems()).data;
        const currentItems = itemsData.data.sort(
          (a, b) => Number(b.data.createTime) - Number(a.data.createTime)
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
      <h2>{t('Last Added Items')}:</h2>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        items.map(({ data, likes, comments }, index) =>
          index < 5 ? (
            <ItemContainer
              key={index}
              data={data}
              likes={likes}
              comments={comments}
            />
          ) : null
        )
      )}
    </Row>
  );
};

export default LastAddedItems;
