export interface IUser {
  isAdmin?: boolean;
  isBlocked?: boolean;
  id?: string;
  username?: string;
  password?: string;
  img?: string;
}

export interface IUsersResponse {
  message: string;
  data: IUser[];
}

export interface IUserResponse {
  message: string;
  data: IUser;
}

export interface ILikedUsers {
  id: string;
}

export interface IUserContainer {
  user: IUser;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}
