import React from 'react';
import { ILastAddedItems } from '../../models';
import { ItemContainer, Statistics, ErrorWrapper } from '../../components';
import { Col } from 'react-bootstrap';

const LastAddedItems = ({ items }: ILastAddedItems) => {
  return (
    <Statistics title="Last Added Items">
      <ErrorWrapper>
        {items.map(({ data, likes, comments }, index) =>
          index < 5 ? (
            <Col key={index}>
              <ItemContainer data={data} likes={likes} comments={comments} />
            </Col>
          ) : null
        )}
      </ErrorWrapper>
    </Statistics>
  );
};

export default LastAddedItems;
