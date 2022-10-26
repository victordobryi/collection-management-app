import { ReactElement } from 'react';
import { ICollection, IFullData } from '../models';

export interface ILargestCollections {
  collections: ICollection[];
}

export interface ILastAddedItems {
  items: IFullData[];
}

export interface IStatisticsContainer {
  title: string;
  children: ReactElement;
}
