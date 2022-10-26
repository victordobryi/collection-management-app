import { INewInputsData, INewInputsKeys } from '../models';

export const getNewInputsData = (data: INewInputsKeys) => {
  const newData: INewInputsData[] = [];

  for (const key in data) {
    const type = key.split('+')[1];
    const name = key.split('+')[0];
    newData.push({ name: name, value: data[key], type: type });
  }

  return newData;
};
