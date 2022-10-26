import axios, { AxiosResponse } from 'axios';
import { FullDataResponse } from '../models';

const URL = 'https://collection-managemenet-server.herokuapp.com/full-data/';

export default class FullDataService {
  static async getFullData(): Promise<AxiosResponse<FullDataResponse>> {
    return axios.get<FullDataResponse>(URL);
  }
}
