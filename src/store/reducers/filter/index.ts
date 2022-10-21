import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterModes {
  byLikes: boolean;
  byComment: boolean;
  likesCount: string;
  commentsCount: string;
}

const initialState: FilterModes = {
  byLikes: false,
  byComment: false,
  likesCount: '5',
  commentsCount: '5'
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
    },
    setLike(state, action: PayloadAction<string>) {
      state.likesCount = action.payload;
    },
    setComment(state, action: PayloadAction<string>) {
      state.commentsCount = action.payload;
    }
  }
});

export default filterSlice.reducer;
