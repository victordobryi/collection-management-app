import axios, { AxiosResponse } from 'axios';
import {
  ICollection,
  ICollectionResponse,
  ICollectionsResponse
} from '../models';

const URL = 'https://collection-managemenet-server.herokuapp.com/collections/';

export default class CollectionService {
  static async getCollections(): Promise<AxiosResponse<ICollectionsResponse>> {
    return axios.get<ICollectionsResponse>(URL);
  }
  static async getCollection(
    id: number | string
  ): Promise<AxiosResponse<ICollectionResponse>> {
    return axios.get<ICollectionResponse>(URL + id);
  }
  static async updateCollection(
    newCollection: ICollection,
    id: string
  ): Promise<AxiosResponse<ICollectionResponse>> {
    return axios.put(URL + id, newCollection);
  }
  static async deleteCollection(
    id: string
  ): Promise<AxiosResponse<ICollectionResponse>> {
    return axios.delete(URL + id);
  }
  static async addCollection(
    newCollection: ICollection
  ): Promise<AxiosResponse<ICollectionResponse>> {
    return axios.post(URL, newCollection);
  }
}
