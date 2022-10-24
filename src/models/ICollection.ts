export interface ICollection {
  id?: string;
  userId?: string;
  title?: string;
  description?: string;
  theme?: string;
  img?: string;
  additionalInputs?: string;
}

export interface ICollectionsResponse {
  message: string;
  data: ICollection[];
}

export interface ICollectionResponse {
  message: string;
  data: ICollection;
}

export interface ICollectionContainer {
  collection: ICollection;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISortedCollectionsKeys {
  [key: string]: number;
}
