export interface IItem {
  id: string;
  title: string;
  likes: number;
  createTime: number;
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
