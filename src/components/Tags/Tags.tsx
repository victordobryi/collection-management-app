import React from 'react';
import { ITags } from '../../models';
import { Tag } from '../../components';

const Tags = ({ data }: ITags) => {
  return (
    <>
      {data.map(({ name }, index) => (
        <Tag key={index} text={name} />
      ))}
    </>
  );
};

export default Tags;
