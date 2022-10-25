export interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  type: 'login' | 'signup';
}

export interface IFormItem {
  label: string;
  type?: string;
  placeholder?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface IFormSelect {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
  options: IOption[];
}

export interface IOption {
  value: string;
  text?: string;
}

export interface IRegistrationFormItem {
  name: string;
  type?: string;
  placeholder: string;
}
