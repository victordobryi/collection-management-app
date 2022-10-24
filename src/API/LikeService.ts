import axios, { AxiosResponse } from 'axios';
import { ILike, ILikesResponse, ILikeResponse } from '../models';

const URL = 'https://collection-managemenet-server.herokuapp.com/likes/';

export default class LikeService {
  static async getItems(): Promise<AxiosResponse<ILikesResponse>> {
    return axios.get<ILikesResponse>(URL);
  }
  static async getItem(
    id: number | string
  ): Promise<AxiosResponse<ILikeResponse>> {
    return axios.get<ILikeResponse>(URL + id);
  }
  static async updateItem(
    newItem: ILike,
    id: string
  ): Promise<AxiosResponse<ILikeResponse>> {
    return axios.put(URL + id, newItem);
  }
  static async deleteItem(id: string): Promise<AxiosResponse<ILikeResponse>> {
    return axios.delete(URL + id);
  }
  static async addItem(newItem: ILike): Promise<AxiosResponse<ILikeResponse>> {
    return axios.post(URL, newItem);
  }
}
