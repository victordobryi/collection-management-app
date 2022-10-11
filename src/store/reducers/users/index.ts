import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';

interface UsersData {
  users: IUser[];
  user: IUser;
}

const initialState: UsersData = {
  users: [],
  user: {} as IUser
};

export const userSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    deleteUsers(state, action: PayloadAction<string>) {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    },
    blockUsers(state, action: PayloadAction<string>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isBlocked = true) : null
      );
    },
    unblockUsers(state, action: PayloadAction<string>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isBlocked = false) : null
      );
    },
    admin(state, action: PayloadAction<string>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isAdmin = true) : null
      );
    },
    notAdmin(state, action: PayloadAction<string>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isAdmin = false) : null
      );
    }
  }
});

export default userSlice.reducer;
