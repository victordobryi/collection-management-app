export interface IComment {
  comment: string;
  fromUserId?: string;
  toUserId?: string;
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
