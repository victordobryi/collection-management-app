export interface IErrorAlert {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
}
