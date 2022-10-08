export interface IItem {
  id?: string;
  collectionId: string;
  title: string;
  likes: number;
  createTime: string;
  additionalInputs?: string;
}

export interface ItemsResponse {
  message: string;
  data: IItem[];
}

export interface ItemResponse {
  message: string;
  data: IItem;
}
