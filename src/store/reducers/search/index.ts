import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchValue {
  value: string;
}

const initialState: SearchValue = {
  value: ''
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    }
  }
});

export default searchSlice.reducer;
