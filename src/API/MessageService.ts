import axios, { AxiosResponse } from 'axios';
import {
  IMessage,
  IMessageResponse,
  IMessagesResponse
} from '../models/IMessage';

const URL = 'https://collection-managemenet-server.herokuapp.com/messages/';

export default class MessageService {
  static async getMessages(): Promise<AxiosResponse<IMessagesResponse>> {
    return axios.get<IMessagesResponse>(URL);
  }
  static async addMessage(
    newMessage: IMessage
  ): Promise<AxiosResponse<IMessageResponse>> {
    return axios.post(URL, newMessage);
  }
  static async getMessagesFromUser(
    id: string
  ): Promise<AxiosResponse<IMessagesResponse>> {
    return axios.get<IMessagesResponse>(URL + id);
  }
}
