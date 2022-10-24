import React from 'react';
import { Card } from 'react-bootstrap';
import { ITagContainer } from '../../models';

const Tag = ({ text, action }: ITagContainer) => {
  return (
    <Card onClick={action} style={{ display: 'inline-block', padding: '5px' }}>
      {text}
    </Card>
  );
};

export default Tag;
