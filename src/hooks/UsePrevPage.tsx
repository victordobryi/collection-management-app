import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsePrevPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return { goBack };
};

export default UsePrevPage;
