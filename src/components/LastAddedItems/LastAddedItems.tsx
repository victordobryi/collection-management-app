import React from 'react';
import { ILastAddedItems } from '../../models';
import { ItemContainer, Statistics } from '../../components';

const LastAddedItems = ({ items }: ILastAddedItems) => {
  return (
    <Statistics title="Last Added Items">
      <>
        {items.map(({ data, likes, comments }, index) =>
          index < 5 ? (
            <ItemContainer
              key={index}
              data={data}
              likes={likes}
              comments={comments}
            />
          ) : null
        )}
      </>
    </Statistics>
  );
};

export default LastAddedItems;
