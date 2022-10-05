import axios, { AxiosResponse } from 'axios';
import { ICollection, CollectionResponse } from '../models/ICollection';

const URL = 'https://collection-managemenet-server.herokuapp.com/collections/';

export default class CollectionService {
  static async getCollections(): Promise<AxiosResponse<CollectionResponse>> {
    return axios.get<CollectionResponse>(URL);
  }
  static async getCollection(
    id: number | string
  ): Promise<AxiosResponse<CollectionResponse>> {
    return axios.get<CollectionResponse>(URL + id);
  }
  static async updateCollection(
    newCollection: ICollection,
    id: number
  ): Promise<AxiosResponse<CollectionResponse>> {
    return axios.put(URL + id, newCollection);
  }
  static async deleteCollection(
    id: number
  ): Promise<AxiosResponse<CollectionResponse>> {
    return axios.delete(URL + id);
  }
  static async addCollection(
    newCollection: ICollection
  ): Promise<AxiosResponse<CollectionResponse>> {
    return axios.post(URL, newCollection);
  }
}
