import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterModes {
  byLikes: boolean;
  byComment: boolean;
}

const initialState: FilterModes = {
  byLikes: false,
  byComment: false
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setLikeMode(state, action: PayloadAction<boolean>) {
      state.byLikes = action.payload;
    },
    setCommentMode(state, action: PayloadAction<boolean>) {
      state.byComment = action.payload;
    }
  }
});

export default filterSlice.reducer;
