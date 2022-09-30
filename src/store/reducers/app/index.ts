import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: false,
  isLoading: false,
  error: ''
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
    }
  }
});

export default authSlice.reducer;
