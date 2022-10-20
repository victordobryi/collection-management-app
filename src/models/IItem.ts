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
  data: IItem[];
}

export interface ItemResponse {
  message: string;
  data: IItem;
}
