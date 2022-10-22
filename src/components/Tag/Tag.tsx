import React from 'react';
import { Card } from 'react-bootstrap';

interface ITag {
  text: string;
  action?: () => void;
}

const Tag = ({ text, action }: ITag) => {
  return (
    <Card onClick={action} style={{ display: 'inline-block', padding: '5px' }}>
      {text}
    </Card>
  );
};

export default Tag;
