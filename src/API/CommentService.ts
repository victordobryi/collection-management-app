import axios, { AxiosResponse } from 'axios';
import { IComment, ICommentResponse, ICommentsResponse } from '../models';

const URL = 'https://collection-managemenet-server.herokuapp.com/comments/';

export default class CommentService {
  static async getComments(): Promise<AxiosResponse<ICommentsResponse>> {
    return axios.get<ICommentsResponse>(URL);
  }
  static async addComment(
    newComment: IComment
  ): Promise<AxiosResponse<ICommentResponse>> {
    return axios.post(URL, newComment);
  }
  static async getCommentsFromUser(
    id: string
  ): Promise<AxiosResponse<ICommentsResponse>> {
    return axios.get<ICommentsResponse>(URL + id);
  }
  static async deleteComment(
    id: string
  ): Promise<AxiosResponse<ICommentsResponse>> {
    return axios.delete(URL + id);
  }
}
