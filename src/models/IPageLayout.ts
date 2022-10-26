import { ReactElement } from 'react';

export interface IPageLayoutButtons {
  createText?: string;
  handleShow?: () => void;
  userId: string;
}

export interface IPageLayout {
  children: ReactElement;
}
