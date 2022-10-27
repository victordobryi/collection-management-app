export interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface IErrorWrapper {
  children?: React.ReactElement | React.ReactNode;
  onReset?: () => void;
}
