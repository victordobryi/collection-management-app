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
  likeId: string | undefined;
  itemId: string;
}
