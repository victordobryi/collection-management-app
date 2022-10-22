import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export interface ISocketContextState {
  socket: Socket | undefined;
  uid: string;
  users: string[];
  comments: string[];
  items: string[];
  likes: string[];
  tags: string[];
  collections: string[];
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  uid: '',
  users: [],
  comments: [],
  items: [],
  likes: [],
  tags: [],
  collections: []
};

export type TSocketContextActions =
  | 'update_socket'
  | 'update_uid'
  | 'update_users'
  | 'remove_user'
  | 'add_user'
  | 'add_comment'
  | 'add_item'
  | 'add_collection'
  | 'update_user'
  | 'update_item'
  | 'update_collection'
  | 'add_like'
  | 'remove_like'
  | 'add_tag';
export type TSocketContextPayload = string | string[] | Socket | number;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  console.log(
    'Message recieved - Action: ' + action.type + ' - Payload: ',
    action.payload
  );

  switch (action.type) {
    case 'update_socket':
      return { ...state, socket: action.payload as Socket };
    case 'update_uid':
      return { ...state, uid: action.payload as string };
    case 'update_users':
      return { ...state, users: action.payload as string[] };
    case 'add_user':
      return {
        ...state,
        users: [...state.users, action.payload as string]
      };
    case 'update_user':
      return {
        ...state,
        users: [...state.users, action.payload as string]
      };
    case 'add_comment':
      return {
        ...state,
        comments: [...state.comments, action.payload as string]
      };
    case 'add_item':
      return {
        ...state,
        items: [...state.items, action.payload as string]
      };
    case 'update_item':
      return {
        ...state,
        items: [...state.items, action.payload as string]
      };
    case 'add_collection':
      return {
        ...state,
        collections: [...state.collections, action.payload as string]
      };
    case 'add_like':
      return {
        ...state,
        likes: [...state.likes, action.payload as string]
      };
    case 'remove_like':
      return {
        ...state,
        likes: [...state.likes, action.payload as string]
      };
    case 'add_tag':
      return {
        ...state,
        tags: [...state.tags, action.payload as string]
      };
    case 'update_collection':
      return {
        ...state,
        collections: [...state.collections, action.payload as string]
      };
    case 'remove_user':
      return {
        ...state,
        users: state.users.filter((uid) => uid !== (action.payload as string))
      };
    default:
      return state;
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {
    ('');
  }
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
