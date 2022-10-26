import React from 'react';
import { Card } from 'react-bootstrap';
import { ITagContainer } from '../../models';
import './tag.scss';

const Tag = ({ text, action }: ITagContainer) => {
  return (
    <Card className="tag" onClick={action}>
      {text}
    </Card>
  );
};

export default Tag;
