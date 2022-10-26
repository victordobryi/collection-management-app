import { ReactElement } from 'react';
import { IFullData } from './IFullData';

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

export interface ICollectionWrapper {
  setItems: React.Dispatch<React.SetStateAction<IFullData[]>>;
  setFilteredItems: React.Dispatch<React.SetStateAction<IFullData[]>>;
  children: ReactElement;
}
