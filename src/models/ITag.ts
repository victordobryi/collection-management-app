export interface ITag {
  id?: string;
  name: string;
}

export interface ITagsResponse {
  message: string;
  data: ITag[];
}

export interface ITagResponse {
  message: string;
  data: ITag;
}

export interface ITagContainer {
  text: string;
  action?: () => void;
}

export interface ITagCreator {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}
