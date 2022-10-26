import { IComment, IFullData, ILike } from '../models';

export interface IItem {
  id?: string;
  collectionId?: string;
  userId?: string;
  title?: string;
  createTime?: string;
  additionalInputs?: string;
  img?: string;
  tags?: string;
}

export interface FullDataResponse {
  message: string;
  data: IFullData[];
}

export interface ItemsResponse {
  message: string;
  data: IItem[];
}

export interface ItemResponse {
  message: string;
  data: IItem;
  likes: ILike;
  comments: IComment[];
}
