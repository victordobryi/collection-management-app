import { IFullData } from './IFullData';

export interface IFilter {
  items: IFullData[];
  setItems: React.Dispatch<React.SetStateAction<IFullData[]>>;
}

export interface IFilterCheckbox {
  label: string;
  action: (isChecked: boolean) => void;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  count: string;
}
