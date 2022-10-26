import React, { useEffect, useState, useContext } from 'react';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { ItemService } from '../API';
import {
  IItem,
  INewInputsData,
  ITag,
  IComment,
  ILikedUsers,
  ILike
} from '../models';
import {
  getCurrentDate,
  mediaUploader,
  DeleteItem,
  getNewInputsData
} from '../utils';
import SocketContext from '../context/SocketContext';
import {
  ContainerButtons,
  ConfirmModal,
  Comments,
  CardContainer,
  EditTextComponent,
  ItemProps,
  Tags,
  Like
} from '../components';
import UsePrevPage from '../hooks/UsePrevPage';
import { useAppSelector } from '../redux-hooks';

const Item = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState<IItem>();
  const [newTitle, setNewTitle] = useState<string>();
  const [newInputsData, setNewInputsData] = useState<INewInputsData[]>([]);
  const [likedUsers, setLikedUsers] = useState<ILikedUsers[]>([]);
  const [isLiked, setIsLike] = useState(false);
  const prev = UsePrevPage();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const {
    socket,
    items,
    likes,
    comments: commentsContextData
  } = useContext(SocketContext).SocketState;
  const localStorageId = localStorage.getItem('id');
  const isUser = localStorageId === currentItem?.userId || isAdmin;
  const location = useLocation();
  const section = location.pathname.split('/')[1];
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);
  const [itemTags, setItemTags] = useState<ITag[]>([]);
  const [like, setLike] = useState<ILike>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const item = (await ItemService.getItem(id!)).data;
        setLike(item.likes);
        setComments(
          item.comments.sort(
            (a, b) => Number(a.currentDate) - Number(b.currentDate)
          )
        );
        setCurrentItem(item.data);
        setNewInputsData(JSON.parse(item.data.additionalInputs!));
        setNewTitle(String(item.data.title));
        const users: ILikedUsers[] = JSON.parse(String(item.likes.likedUsers));
        setLikedUsers(users);
        const isUser = users.find(({ id }) => id === localStorageId);
        setIsLike(isUser ? true : false);
        const tags = JSON.parse(String(item.data.tags));
        setItemTags(tags);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [likes, items, commentsContextData, id]);

  useEffect(() => {
    if (files.length) {
      addImage();
    }
  }, [files]);

  const date = getCurrentDate(currentItem?.createTime);

  const newData: INewInputsData[] = getNewInputsData(
    JSON.parse(currentItem ? currentItem.additionalInputs! : '[]')
  );

  const toggleModal = () => setShow(!show);

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

  return isLoading ? (
    <Spinner animation="border" role="status" />
  ) : (
    <>
      <ContainerButtons userId={String(currentItem?.userId)} />
      <Container className="d-flex align-items-center justify-content-center flex-column flex-grow-1">
        <CardContainer
          isOnPage={Boolean(id)}
          containerName="item"
          sectionName={section}
          isUser={isUser}
          deleteElem={deleteItem}
          setFiles={setFiles}
          title={currentItem?.title}
          img={currentItem?.img}
          hovered={hovered}
          setHovered={setHovered}
        >
          <>
            <EditTextComponent
              hovered={hovered}
              setValue={setNewTitle}
              defaultValue={String(newTitle)}
              value={newTitle}
              title="Title"
              isUser={isUser}
              onBlur={changeTitle}
            />
            <ItemProps
              isUser={isUser}
              hovered={hovered}
              data={newData}
              id={id}
              newInputs={newInputsData}
            />
            <Like
              count={Number(like?.count)}
              isLiked={isLiked}
              likeId={String(like?.id)}
              likedUsers={likedUsers}
            />
            <Tags data={itemTags} />
            <Card.Footer>{date}</Card.Footer>
          </>
        </CardContainer>
      </Container>
      <Comments
        userId={currentItem?.userId}
        itemId={id}
        commentsData={comments}
      />
      <ConfirmModal show={show} onHide={toggleModal} deleteFunc={deleteItem} />
    </>
  );
};

export default Item;
