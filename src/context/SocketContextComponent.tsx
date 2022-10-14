import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState
} from 'react';
import { useSocket } from '../socket-hooks/useSocket';
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer
} from './SocketContext';
import { Spinner } from 'react-bootstrap';

const SocketContextComponent: React.FunctionComponent<PropsWithChildren> = (
  props
) => {
  const { children } = props;

  const socket = useSocket(
    'ws://collection-managemenet-server.herokuapp.com/',
    {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: false
    }
  );

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();
    StartListeners();
    SocketDispatch({ type: 'update_socket', payload: socket });
    SendHandshake();
  }, []);

  const StartListeners = () => {
    socket.on('add_user', (user: string) => {
      SocketDispatch({ type: 'add_user', payload: user });
    });

    socket.on('update_user', (user: string) => {
      SocketDispatch({ type: 'update_user', payload: user });
    });

    socket.on('add_comment', (message: string) => {
      SocketDispatch({ type: 'add_comment', payload: message });
    });

    socket.on('add_item', (item: string) => {
      SocketDispatch({ type: 'add_item', payload: item });
    });

    socket.on('update_item', (item: string) => {
      SocketDispatch({ type: 'update_item', payload: item });
    });

    socket.on('add_collection', (collection: string) => {
      SocketDispatch({ type: 'add_collection', payload: collection });
    });

    socket.on('update_collection', (collection: string) => {
      SocketDispatch({ type: 'update_collection', payload: collection });
    });

    socket.on('add_like', (like: string) => {
      SocketDispatch({ type: 'add_like', payload: like });
    });

    socket.on('remove_like', (like: string) => {
      SocketDispatch({ type: 'remove_like', payload: like });
    });

    socket.on('user_connected', (users: string[]) => {
      console.info('User connected message received');
      SocketDispatch({ type: 'update_users', payload: users });
    });

    socket.on('user_disconnected', (uid: string) => {
      console.info('User disconnected message received');
      SocketDispatch({ type: 'remove_user', payload: uid });
    });

    socket.io.on('reconnect', (attempt) => {
      console.info('Reconnected on attempt: ' + attempt);
      SendHandshake();
    });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.info('Reconnection Attempt: ' + attempt);
    });

    socket.io.on('reconnect_error', (error) => {
      console.info('Reconnection error: ' + error);
    });

    socket.io.on('reconnect_failed', () => {
      console.info('Reconnection failure.');
      alert(
        'We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.'
      );
    });
  };

  const SendHandshake = async () => {
    socket.emit('handshake', async (uid: string, users: string[]) => {
      SocketDispatch({ type: 'update_users', payload: users });
      SocketDispatch({ type: 'update_uid', payload: uid });
    });

    setLoading(false);
  };

  return loading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
