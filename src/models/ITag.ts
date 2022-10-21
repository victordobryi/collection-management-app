export interface Itag {
  id?: string;
  name: string;
  itemId: string;
}

export interface ITagsResponse {
  message: string;
  data: Itag[];
}

export interface ITagResponse {
  message: string;
  data: Itag;
}
