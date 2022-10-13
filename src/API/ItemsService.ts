import axios, { AxiosResponse } from 'axios';
import { IItem, ItemResponse, ItemsResponse } from '../models/IItem';

const URL = 'https://collection-managemenet-server.herokuapp.com/items/';

export default class ItemService {
  static async getItems(): Promise<AxiosResponse<ItemsResponse>> {
    return axios.get<ItemsResponse>(URL);
  }
  static async getItem(
    id: number | string
  ): Promise<AxiosResponse<ItemResponse>> {
    return axios.get<ItemResponse>(URL + id);
  }
  static async updateItem(
    newItem: IItem,
    id: string
  ): Promise<AxiosResponse<ItemResponse>> {
    return axios.put(URL + id, newItem);
  }
  static async deleteItem(id: number): Promise<AxiosResponse<ItemResponse>> {
    return axios.delete(URL + id);
  }
  static async addItem(newItem: IItem): Promise<AxiosResponse<ItemResponse>> {
    return axios.post(URL, newItem);
  }
}
