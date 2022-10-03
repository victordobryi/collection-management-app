import axios, { AxiosResponse } from 'axios';
import { IUser, UserResponse } from '../models/IUser';

const URL = 'https://collection-managemenet-server.herokuapp.com/users/';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<UserResponse>> {
    return axios.get<UserResponse>(URL);
  }
  static async getUser(id: number | string): Promise<AxiosResponse<IUser>> {
    return axios.get<IUser>(URL + id);
  }
  static async updateUser(
    newUser: IUser,
    id: number
  ): Promise<AxiosResponse<IUser>> {
    return axios.put(URL + id, newUser);
  }
  static async deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return axios.delete(URL + id);
  }
  static async addUser(newUser: IUser): Promise<AxiosResponse<IUser>> {
    return axios.post(URL, newUser);
  }
}
