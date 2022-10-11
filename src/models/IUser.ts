export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  isAdmin?: boolean;
  isBlocked?: boolean;
  id?: string;
  username: string;
  password?: string;
  img?: string;
}

export interface UsersResponse {
  message: string;
  data: IUser[];
}

export interface UserResponse {
  message: string;
  data: IUser;
}
