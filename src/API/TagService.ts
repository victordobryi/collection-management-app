import axios, { AxiosResponse } from 'axios';
import { Itag, ITagResponse, ITagsResponse } from '../models/ITag';

const URL = 'https://collection-managemenet-server.herokuapp.com/tags/';

export default class TagService {
  static async getTags(): Promise<AxiosResponse<ITagsResponse>> {
    return axios.get<ITagsResponse>(URL);
  }
  static async getTag(
    id: number | string
  ): Promise<AxiosResponse<ITagResponse>> {
    return axios.get<ITagResponse>(URL + id);
  }

  static async deleteTag(id: string): Promise<AxiosResponse<ITagResponse>> {
    return axios.delete(URL + id);
  }

  static async addTag(newItem: Itag): Promise<AxiosResponse<ITagResponse>> {
    return axios.post(URL, newItem);
  }
}
