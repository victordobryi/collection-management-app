import React from 'react';
import { IErrorFallback } from '../../models';

const ErrorFallback = ({ error, resetErrorBoundary }: IErrorFallback) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
