// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  password: string;
  token: string | null;
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  email: '',
  password: '',
  token: null,
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser(state) {
      state.email = '';
      state.password = '';
      state.token = null;
      state.firstName = '';
      state.lastName = '';
    },
    // Ajouter d'autres reducers selon les besoins
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
