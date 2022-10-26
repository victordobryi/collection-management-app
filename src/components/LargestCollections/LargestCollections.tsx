import React from 'react';
import { ILargestCollections } from '../../models';
import { CollectionContainer, Statistics } from '../../components';

const LargestCollections = ({ collections }: ILargestCollections) => {
  return (
    <Statistics title="Largest Collections">
      <>
        {collections.map((collection, index) =>
          index < 5 ? (
            <CollectionContainer key={index} collection={collection} />
          ) : null
        )}
      </>
    </Statistics>
  );
};

export default LargestCollections;
