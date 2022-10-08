export interface ICollection {
  id?: string;
  userId: string;
  title: string;
  description: string;
  theme: string;
  img?: string;
  additionalInputs?: string;
}

export interface CollectionsResponse {
  message: string;
  data: ICollection[];
}

export interface CollectionResponse {
  message: string;
  data: ICollection;
}
