import React from 'react';
import { ITags } from '../../models';
import { Tag } from '../../components';

const Tags = ({ data }: ITags) => {
  return (
    <div className="item-tags">
      {data.map(({ name }, index) => (
        <Tag key={index} text={name} />
      ))}
    </div>
  );
};

export default Tags;
