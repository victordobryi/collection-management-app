import React from 'react';
import LargestCollections from '../components/LargestCollections/LargestCollections';
import LastAddedItems from '../components/LastAddedItems/LastAddedItems';

const Main = () => {
  return (
    <>
      <LastAddedItems />
      <LargestCollections />
    </>
  );
};

export default Main;
