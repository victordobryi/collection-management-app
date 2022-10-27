import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IErrorWrapper } from '../../models';
import ErrorFallback from './ErrorFallback';

const ErrorWrapper = ({ children, onReset }: IErrorWrapper) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorWrapper;
