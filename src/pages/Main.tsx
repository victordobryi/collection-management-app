import React, { useEffect } from 'react';
import LargestCollections from '../components/LargestCollections';
import LastAddedItems from '../components/LastAddedItems';
import { useAppDispatch } from '../redux-hooks';
import { isUser } from '../store/action-creators/users';
import { authSlice } from '../store/reducers/auth';

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(isUser());
  });
  return (
    <>
      <LastAddedItems />
      <LargestCollections />
    </>
  );
};

export default Main;
