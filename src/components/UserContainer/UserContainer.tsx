import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IUserContainer } from '../../models';
import { UserService } from '../../API';
import SocketContext from '../../context/SocketContext';
import UsePrevPage from '../../hooks/UsePrevPage';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { userLogout } from '../../store/action-creators/users';
import { CardContainer, EditTextComponent } from '../../components';
import { DeleteUser, mediaUploader } from '../../utils';

const UserContainer = ({ user, setIsLoading }: IUserContainer) => {
  const { username, img, id } = user;
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState(username);
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { socket } = useContext(SocketContext).SocketState;
  const prev = UsePrevPage();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.auth);
  const localStorageId = localStorage.getItem('id');
  const isUser = localStorageId === userId || isAdmin;
  const location = useLocation();
  const section = location.pathname.split('/')[1];
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<Error>();

  if (error) throw new Error(error.message);

  useEffect(() => {
    if (files.length) {
      addImage();
    }
  }, [files]);

  const addImage = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const url = await mediaUploader(files, 'users');
        await UserService.updateUser({ img: url[0] }, String(userId));
        if (socket) {
          socket.emit('update_CurrentUser', JSON.stringify({ img: url[0] }));
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const goToUser = () => {
    if (!userId) {
      navigate(`/user/${id}`);
    }
  };

  const changeName = async () => {
    try {
      await UserService.updateUser({ username: name }, String(userId));
      if (socket) {
        socket.emit('update_CurrentUser', JSON.stringify({ username: name }));
      }
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const deleteUser = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        await DeleteUser(String(userId));
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        prev.goBack();
        dispatch(userLogout());
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <CardContainer
        onClick={goToUser}
        isOnPage={Boolean(userId)}
        containerName="user"
        sectionName={section}
        isUser={isUser}
        deleteElem={deleteUser}
        setFiles={setFiles}
        title={username}
        img={img}
        hovered={hovered}
        setHovered={setHovered}
        isAvatar
      >
        <EditTextComponent
          hovered={hovered}
          setValue={setName}
          defaultValue={String(username)}
          value={name}
          isUser={isUser}
          onBlur={changeName}
        />
      </CardContainer>
    </>
  );
};

export default UserContainer;
