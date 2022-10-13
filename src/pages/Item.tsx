import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import ItemService from '../API/ItemsService';
import { IItem } from '../models/IItem';
import { getCurrentDate } from '../utils/getCurrentTime';
import { Data } from '../components/ItemContainer/ItemContainer';
import { newInputsData } from '../components/CreateItemForm/CreateItemForm';
import SocketContext from '../context/SocketContext';
import ContainerButtons from '../components/ContainerButtons/ContainerButtons';
import Avatar from 'react-avatar';
import { mediaUploader } from '../utils/mediaUploader';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { BsFillPencilFill } from 'react-icons/bs';

const Item = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState<IItem>();
  const { socket, items } = useContext(SocketContext).SocketState;
  const [newTitle, setNewTitle] = useState('');
  const [text, setText] = useState<string | undefined>('');
  const [newInputsData, setNewInputsData] = useState<newInputsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const item = (await ItemService.getItem(id!)).data;
        if (item) {
          setCurrentItem(item.data);
          setNewInputsData(JSON.parse(item.data.additionalInputs!));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [items]);

  useEffect(() => {
    setText(currentItem?.title);
  }, [currentItem]);

  const newData: newInputsData[] = [];
  const date = getCurrentDate(currentItem?.createTime);

  if (currentItem) {
    const data: Data = JSON.parse(currentItem.additionalInputs!);
    for (const k in data) {
      const type = k.split('+')[1];
      const name = k.split('+')[0];
      newData.push({ name: name, value: data[k], type: type });
    }
  }

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const target = e.target as HTMLInputElement;
        const files = [...Object.values(target.files!)];
        const url = await mediaUploader([...files], 'items');
        await ItemService.updateItem({ img: url[0] }, String(id));
        if (socket) {
          socket.emit('update_CurrentItem', JSON.stringify({ img: url[0] }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeTitle = async () => {
    await ItemService.updateItem({ title: newTitle }, String(id));
    if (socket) {
      socket.emit('update_CurrentItem', JSON.stringify({ title: newTitle }));
    }
  };

  const handleSave = async ({ name, value }: onSaveProps) => {
    await ItemService.updateItem(
      {
        additionalInputs: JSON.stringify({ ...newInputsData, [name]: value })
      },
      String(id)
    );
    if (socket) {
      socket.emit(
        'update_CurrentItem',
        JSON.stringify({
          additionalInputs: JSON.stringify({
            ...newInputsData,
            [name]: value
          })
        })
      );
    }
  };

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <ContainerButtons />
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        <Card
          style={{ width: '50%', cursor: id ? 'default' : 'pointer' }}
          className="flex-grow-1 m-2 align-items-center"
          onMouseEnter={() => (id ? setHovered(true) : null)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Header
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <Form>
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="avatar"
                  style={{
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    marginBottom: '0'
                  }}
                >
                  <Avatar
                    name={currentItem?.title}
                    size="100%"
                    src={currentItem?.img}
                  />
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={addImage}
                  style={{ display: 'none' }}
                  id="avatar"
                />
              </Form.Group>
            </Form>
          </Card.Header>
          <Card.Body className="pb-0">
            <EditText
              name="title"
              defaultValue={text}
              editButtonContent={<BsFillPencilFill />}
              editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
              showEditButton={hovered}
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              onBlur={changeTitle}
            />
            {newData.map(({ name, value, type }, index) => (
              <div key={index} className="d-flex align-items-baseline">
                <Card.Text>{`${name}: `}</Card.Text>
                {type === 'textarea' ? (
                  <EditTextarea
                    name={name + '+' + type}
                    defaultValue={value}
                    onSave={handleSave}
                    type={type}
                  />
                ) : type === 'checkbox' ? (
                  <Form.Select
                    defaultValue={value}
                    onBlur={(e) =>
                      handleSave({
                        name: name + '+' + type,
                        value: e.target.value,
                        previousValue: ''
                      })
                    }
                  >
                    <option disabled>{name}</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </Form.Select>
                ) : (
                  <EditText
                    name={name + '+' + type}
                    defaultValue={String(value)}
                    editButtonContent={<BsFillPencilFill />}
                    editButtonProps={{
                      style: { marginLeft: '10px', minWidth: 25 }
                    }}
                    showEditButton={hovered}
                    onSave={handleSave}
                    type={type}
                  />
                )}
              </div>
            ))}
          </Card.Body>
          <Button variant="primary" className="my-3">
            <AiOutlineHeart /> {currentItem?.likes}
          </Button>
          <Card.Footer>{date}</Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default Item;
