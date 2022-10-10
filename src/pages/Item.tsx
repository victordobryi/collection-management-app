import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Container, Spinner } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import ItemService from '../API/ItemsService';
import { IItem } from '../models/IItem';
import { getCurrentDate } from '../utils/getCurrentTime';
import { useTranslation } from 'react-i18next';
import { Data } from '../components/ItemContainer/ItemContainer';
import { newInputsData } from '../components/CreateItemForm/CreateItemForm';
import SocketContext from '../context/SocketContext';

const Item = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState('');
  const [currentItem, setCurrentItem] = useState<IItem>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { items } = useContext(SocketContext).SocketState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const item = (await ItemService.getItem(id!)).data;
        if (item) {
          setCollectionId(item.data.collectionId);
          setCurrentItem(item.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [items]);

  const goBack = () => {
    navigate(`/collection/${collectionId}`);
  };
  const newData: newInputsData[] = [];
  const date = getCurrentDate(currentItem?.createTime);

  if (currentItem) {
    const data: Data = JSON.parse(currentItem.additionalInputs!);
    for (const k in data) {
      newData.push({ name: k, value: data[k] });
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-between  mt-3 ">
        <Button className="align-self-start" onClick={goBack}>
          {t('Go back')}
        </Button>
      </Container>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
            <Card
              style={{ width: '50%' }}
              className="flex-grow-1 m-2 align-items-center"
            >
              <Card.Header
                style={{
                  backgroundImage: `url(${currentItem?.img})`,
                  height: '30vh',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  width: '75%',
                  backgroundColor: 'transparent',
                  backgroundPosition: 'center'
                }}
              ></Card.Header>
              <Card.Body>
                <Card.Title>{currentItem?.title}</Card.Title>
                {newData.map(({ name, value }, index) => (
                  <Card.Text key={index}>{`${name}: ${value}`}</Card.Text>
                ))}
                <Button variant="primary">
                  <AiOutlineHeart /> {currentItem?.likes}
                </Button>
              </Card.Body>
              <Card.Footer>{date}</Card.Footer>
            </Card>
          </Container>
        </>
      )}
    </>
  );
};

export default Item;
