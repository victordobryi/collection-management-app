import { INewInputsData } from './INewInputsData';

export interface IItemProps {
  data: INewInputsData[];
  id: string | undefined;
  isUser: boolean;
  hovered: boolean;
  newInputs: INewInputsData[];
}
