export interface IFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  type: 'login' | 'signup';
}
