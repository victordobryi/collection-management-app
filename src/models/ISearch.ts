import { IItem, IComment } from '../models';

export interface ISearch {
  placeholder: string;
  action: (value: string) => void;
  value?: string;
}

export interface ISearchResults {
  results: (IItem & IComment)[];
  value: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISearchResult {
  onClick: () => void;
  result: IItem & IComment;
  value: string;
}
