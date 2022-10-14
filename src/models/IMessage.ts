export interface IMessage {
  message?: string;
  fromUserId?: number;
  toUserId?: number;
  currentDate?: string;
  fromUserName?: string;
  id?: number;
}

export interface IMessagesResponse {
  message: string;
  data: IMessage[];
}

export interface IMessageResponse {
  message: string;
  data: IMessage;
}
