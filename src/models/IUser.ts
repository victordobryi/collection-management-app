export interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  isAuth?: boolean;
  isAdmin?: boolean;
  isBlocked?: boolean;
  id?: string;
  language?: string;
  isDarkMode?: boolean;
  username: string;
  password: string;
}

export interface UserResponse {
  message: string;
  data: IUser[];
}
