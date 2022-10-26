export interface INewInputsProps {
  name: string;
  type: string;
}

export interface INewInputsData extends INewInputsProps {
  value: string;
}

export interface INewInputsKeys {
  [value: string]: string;
}

export interface INewInputsModal {
  handleCloseAdditional: () => void;
  setProp: React.Dispatch<React.SetStateAction<INewInputsProps[]>>;
  additionalProps: INewInputsProps[];
}
