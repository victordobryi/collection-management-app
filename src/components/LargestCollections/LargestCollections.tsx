import React from 'react';
import { ILargestCollections } from '../../models';
import {
  CollectionContainer,
  Statistics,
  ErrorWrapper
} from '../../components';
import { Col } from 'react-bootstrap';

const LargestCollections = ({ collections }: ILargestCollections) => {
  return (
    <Statistics title="Largest Collections">
      <ErrorWrapper>
        {collections.map((collection, index) =>
          index < 5 ? (
            <Col key={index}>
              <CollectionContainer collection={collection} />
            </Col>
          ) : null
        )}
      </ErrorWrapper>
    </Statistics>
  );
};

export default LargestCollections;
