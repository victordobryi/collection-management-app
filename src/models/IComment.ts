import { IUser } from './IUser';

export interface IComment {
  comment: string;
  fromUserId?: string;
  toUserId?: string;
  toItemId: string;
  currentDate: string;
  fromUserName?: string;
  id?: number;
}

export interface ICommentsResponse {
  message: string;
  data: IComment[];
}

export interface ICommentResponse {
  message: string;
  data: IComment;
}

export interface ICommentContainer {
  username?: string;
  date: string;
  comment: string;
}

export interface ICommentForm {
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICommentModal {
  show: boolean;
  handleClose: () => void;
  currentUser?: IUser;
  itemId?: string;
}

export interface IComments {
  userId: string | undefined;
  itemId: string | undefined;
}
