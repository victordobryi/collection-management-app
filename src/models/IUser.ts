export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  isAdmin?: boolean;
  isBlocked?: boolean;
  id: string;
  username: string;
  password?: string;
}

export interface UserResponse {
  message: string;
  data: IUser[];
}
