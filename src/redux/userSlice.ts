import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthType {
  users : UserType[] ;
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthType = {
  // Array of users
  users:[],
  // single user
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    loadUser : (state , action : PayloadAction<UserType[]>) => {
        state.users = action.payload
    },
    loginStart(state) {
      state.user = null;
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
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

export const { loginFailure, loginStart, loginSuccess, logoutUser,loadUser } = userSlice.actions;
export default userSlice.reducer;
