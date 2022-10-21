import { IComment } from './IComment';
import { ILike } from './ILike';

export interface IItem {
  id?: string;
  collectionId?: string;
  userId?: string;
  title?: string;
  createTime?: string;
  additionalInputs?: string;
  img?: string;
}

export interface ItemsResponse {
  message: string;
  data: FullData[];
}

export interface ItemResponse {
  message: string;
  data: IItem;
  likes: ILike[];
  comments: IComment[];
}

export interface FullData {
  data: IItem;
  likes: ILike[];
  comments: IComment[];
}
