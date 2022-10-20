import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import { useLocation, useParams } from 'react-router-dom';
import ItemService from '../API/ItemsService';
import { IItem } from '../models/IItem';
import { getCurrentDate } from '../utils/getCurrentTime';
import { Data, ILikedUsers } from '../components/ItemContainer/ItemContainer';
import { newInputsData } from '../components/CreateItemForm/CreateItemForm';
import SocketContext from '../context/SocketContext';
import ContainerButtons from '../components/ContainerButtons/ContainerButtons';
import Avatar from 'react-avatar';
import { mediaUploader } from '../utils/mediaUploader';
import { EditText, EditTextarea, onSaveProps } from 'react-edit-text';
import { BsFillPencilFill } from 'react-icons/bs';
import UsePrevPage from '../hooks/UsePrevPage';
import { DeleteItem } from '../utils/deleteData';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import { useAppSelector } from '../redux-hooks';
import LikeService from '../API/LikeService';
import { ILike } from '../models/ILike';
import Comments from '../components/Comments/Comments';
import { DropImageZone } from '../components/DropImageZone/DropImageZone';

const Item = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<IItem>();
  const { socket, items, likes } = useContext(SocketContext).SocketState;
  const [newTitle, setNewTitle] = useState('');
  const [newInputsData, setNewInputsData] = useState<newInputsData[]>([]);
  const prev = UsePrevPage();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const [like, setLike] = useState<ILike>();
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [count, setCount] = useState(0);
  const [isLiked, setIsLike] = useState(false);
  const localStorageId = localStorage.getItem('id');
  const isUserId = localStorageId === currentItem?.userId || isAdmin;
  const location = useLocation();
  const section = location.pathname.split('/')[1];
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const item = (await ItemService.getItem(id!)).data;
        const likes = (await LikeService.getItems()).data.data;
        const currentLike = likes.find(({ postId }) => postId === id);
        setLike(currentLike);
        setCount(Number(currentLike?.count || 0));
        if (item) {
          setCurrentItem(item.data);
          setNewInputsData(JSON.parse(item.data.additionalInputs!));
          setNewTitle(String(item.data.title));
        }
        if (currentLike) {
          setLikedUsers(JSON.parse(String(currentLike?.likedUsers)));
          const users: ILikedUsers[] = JSON.parse(
            String(currentLike?.likedUsers)
          );
          const isUser = users.find(({ id }) => id === localStorageId);
          setIsLike(isUser ? true : false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [likes, items]);

  useEffect(() => {
    if (files.length) {
      addImage();
    }
  }, [files]);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addImage = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const url = await mediaUploader(files, 'items');
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

  const deleteItem = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        await DeleteItem({ itemId: id });
      } catch (error) {
        console.log(error);
      } finally {
        prev.goBack();
        setIsLoading(false);
      }
    }
  };

  const addLike = async () => {
    const newUsers = [...likedUsers, { id: String(localStorageId) }];
    try {
      setCount(count + 1);
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...newUsers]),
          count: count + 1
        },
        String(like?.id)
      );
      if (socket) {
        socket.emit('add_CurrentLike', JSON.stringify({ ...newUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    const updatedUsers = [...likedUsers].filter(
      ({ id }) => id !== localStorageId
    );
    try {
      setCount(count - 1);
      await LikeService.updateItem(
        {
          likedUsers: JSON.stringify([...updatedUsers]),
          count: count - 1
        },
        String(like?.id)
      );
      if (socket) {
        socket.emit('remove_CurrentLike', JSON.stringify({ ...updatedUsers }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <ContainerButtons userId={String(currentItem?.userId)} />
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        <Card
          style={{
            width: '50%',
            cursor: id ? 'default' : 'pointer'
          }}
          className="flex-grow-1 m-2 align-items-center"
          onMouseEnter={() => (id ? setHovered(true) : null)}
          onMouseLeave={() => setHovered(false)}
        >
          <AiOutlineClose
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              visibility: hovered && isUserId ? 'visible' : 'hidden',
              cursor: 'pointer'
            }}
            onClick={handleShow}
          />
          <Card.Header
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <Form
              style={{
                pointerEvents: isUserId && section === 'item' ? 'auto' : 'none',
                position: 'relative'
              }}
            >
              <Avatar
                name={currentItem?.title}
                size="340"
                src={currentItem?.img}
              />
              <DropImageZone setFiles={setFiles} isVisible={false} />
            </Form>
          </Card.Header>
          <Card.Body
            className="pb-0"
            style={{ pointerEvents: isUserId ? 'auto' : 'none' }}
          >
            <EditText
              name="title"
              defaultValue={newTitle}
              editButtonContent={<BsFillPencilFill />}
              editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
              showEditButton={hovered && isUserId}
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
                    showEditButton={hovered && isUserId}
                    onSave={handleSave}
                    type={type}
                  />
                )}
              </div>
            ))}
          </Card.Body>
          <Button
            variant="primary"
            className="my-3"
            onClick={() => {
              isLiked ? removeLike() : addLike();
            }}
          >
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            {count}
          </Button>
          <Card.Footer>{date}</Card.Footer>
        </Card>
      </Container>
      <Comments userId={currentItem?.userId} itemId={id} />
      <ConfirmModal show={show} onHide={handleClose} deleteFunc={deleteItem} />
    </>
  );
};

export default Item;
