import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthType = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    loginStart(state) {
      state.user = null;
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<AuthType>) {
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    },
     loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
      state.user = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginFailure, loginStart, loginSuccess, logoutUser, } = userSlice.actions;
export default userSlice.reducer;
