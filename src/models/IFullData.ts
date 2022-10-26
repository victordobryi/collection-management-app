import { IComment, IItem, ILike } from '../models';

export interface IFullData {
  data: IItem;
  likes: ILike;
  comments: IComment[];
}
