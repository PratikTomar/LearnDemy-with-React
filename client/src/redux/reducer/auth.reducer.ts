import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../models/user.model";

export type UserAuth = {
  isUserAuthenticated: boolean;
  user: UserModel;
};

const initialState: UserAuth = {
  isUserAuthenticated: false,
  user: new UserModel(),
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserAuth>) => {
      state.isUserAuthenticated = action.payload.isUserAuthenticated;
      state.user = action.payload.user;
      return state;
    },
    signUpUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
      return state;
    },
    logOutUser: (state) => {
      state.isUserAuthenticated = false;
      state.user = new UserModel();
    }
  },
});

export const { loginUser, signUpUser, logOutUser } = authReducer.actions;
export default authReducer.reducer;
