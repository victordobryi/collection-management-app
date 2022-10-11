import axios, { AxiosResponse } from 'axios';
import { IUser, UserResponse, UsersResponse } from '../models/IUser';

const URL = 'https://collection-managemenet-server.herokuapp.com/users/';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<UsersResponse>> {
    return axios.get<UsersResponse>(URL);
  }
  static async getUser(
    id: number | string
  ): Promise<AxiosResponse<UserResponse>> {
    return axios.get<UserResponse>(URL + id);
  }
  static async updateUser(
    newUser: IUser,
    id: string
  ): Promise<AxiosResponse<UserResponse>> {
    return axios.put(URL + id, newUser);
  }
  static async deleteUser(id: string): Promise<AxiosResponse<UserResponse>> {
    return axios.delete(URL + id);
  }
  static async addUser(newUser: IUser): Promise<AxiosResponse<UserResponse>> {
    return axios.post(URL, newUser);
  }
}
