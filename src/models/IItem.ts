export interface IItem {
  id: string;
  title: string;
  likes: number;
  createTime: string;
  additionalInputs?: string;
}

export interface ItemResponse {
  message: string;
  data: IItem[];
}
