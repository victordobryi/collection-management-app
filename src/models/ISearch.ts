import { IItem, IComment } from '../models';

export interface ISearch {
  placeholder: string;
  action: (value: string) => void;
}

export interface ISearchResults {
  results: (IItem & IComment)[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISearchResult {
  onClick: () => void;
  result: IItem & IComment;
}
