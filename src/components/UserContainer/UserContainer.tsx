import React, { useContext, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import Avatar from 'react-avatar';
import { EditText } from 'react-edit-text';
import UserService from '../../API/UserService';
import { mediaUploader } from '../../utils/mediaUploader';
import SocketContext from '../../context/SocketContext';
import { AiOutlineClose } from 'react-icons/ai';
import UsePrevPage from '../../hooks/UsePrevPage';
import { useAppDispatch } from '../../redux-hooks';
import { userLogout } from '../../store/action-creators/users';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { DeleteUser } from '../../utils/deleteData';

interface IUserContainer {
  user: IUser;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContainer = ({ user, setIsLoading }: IUserContainer) => {
  const { username, img, id } = user;
  const [hovered, setHovered] = useState(false);
  const [name, setName] = useState(username);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { socket } = useContext(SocketContext).SocketState;
  const prev = UsePrevPage();
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        const target = e.target as HTMLInputElement;
        const files = [...Object.values(target.files!)];
        const url = await mediaUploader([...files], 'users');
        await UserService.updateUser({ img: url[0] }, String(userId));
        if (socket) {
          socket.emit('update_CurrentUser', JSON.stringify({ img: url[0] }));
        }
      } catch (error) {
        console.log(error);
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
    await UserService.updateUser({ username: name }, String(userId));
    if (socket) {
      socket.emit('update_CurrentUser', JSON.stringify({ username: name }));
    }
  };

  const deleteUser = async () => {
    if (setIsLoading) {
      try {
        setIsLoading(true);
        await DeleteUser(String(userId));
      } catch (error) {
        console.log(error);
      } finally {
        prev.goBack();
        dispatch(userLogout());
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Card
        style={{ width: '10rem', cursor: userId ? 'default' : 'pointer' }}
        className="d-flex align-items-center"
        onClick={goToUser}
        onMouseEnter={() => (userId ? setHovered(true) : null)}
        onMouseLeave={() => setHovered(false)}
      >
        <AiOutlineClose
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            visibility: hovered ? 'visible' : 'hidden',
            cursor: 'pointer'
          }}
          onClick={handleShow}
        />
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
                <Avatar name={username} size="120" round="100%" src={img} />
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
        <Card.Body
          style={{
            fontSize: '1.3rem',
            textAlign: 'center'
          }}
        >
          <EditText
            name="username"
            defaultValue={username}
            editButtonProps={{ style: { marginLeft: '10px', minWidth: 25 } }}
            showEditButton={hovered}
            onChange={(e) => setName(e.target.value)}
            value={name}
            onBlur={changeName}
          />
        </Card.Body>
      </Card>
      <ConfirmModal show={show} onHide={handleClose} deleteFunc={deleteUser} />
    </>
  );
};

export default UserContainer;
