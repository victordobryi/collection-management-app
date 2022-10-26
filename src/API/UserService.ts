import axios, { AxiosResponse } from 'axios';
import { IUser, IUserResponse, IUsersResponse } from '../models';

const URL = 'https://collection-managemenet-server.herokuapp.com/users/';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUsersResponse>> {
    return axios.get<IUsersResponse>(URL);
  }
  static async getUser(
    id: number | string
  ): Promise<AxiosResponse<IUserResponse>> {
    return axios.get<IUserResponse>(URL + id);
  }
  static async updateUser(
    newUser: IUser,
    id: string
  ): Promise<AxiosResponse<IUserResponse>> {
    return axios.put(URL + id, newUser);
  }
  static async deleteUser(id: string): Promise<AxiosResponse<IUserResponse>> {
    return axios.delete(URL + id);
  }
  static async addUser(newUser: IUser): Promise<AxiosResponse<IUserResponse>> {
    return axios.post(URL, newUser);
  }
}
