import { ILikedUsers } from './IUser';

export interface ILike {
  id?: string;
  postId?: string;
  likedUsers?: string;
  count?: number;
}

export interface ILikesResponse {
  message: string;
  data: ILike[];
}

export interface ILikeResponse {
  message: string;
  data: ILike;
}

export interface ILikeButton {
  isLiked: boolean;
  likedUsers: ILikedUsers[];
  count: number;
  likeId: string;
}
