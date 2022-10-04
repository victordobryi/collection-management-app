import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  isAdmin: boolean;
  lang: 'pl' | 'gb';
}

const initialState: Auth = {
  isAuth: false,
  isLoading: false,
  error: '',
  isAdmin: false,
  lang: 'gb'
};

export const authSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setLang(state, action: PayloadAction<'pl' | 'gb'>) {
      state.lang = action.payload;
    }
  }
});

export default authSlice.reducer;
