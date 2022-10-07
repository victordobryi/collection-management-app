export interface ICollection {
  id: string;
  title: string;
  description: string;
  theme: string;
  img?: string;
  additionalInputs?: string;
}

export interface CollectionResponse {
  message: string;
  data: ICollection[];
}
