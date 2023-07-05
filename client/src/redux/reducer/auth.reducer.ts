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

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    addExistingUser(state, action: PayloadAction<UserAuth>) {
      state.isUserAuthenticated = action.payload.isUserAuthenticated;
      state.user = action.payload.user;
      return state;
    },
    signUpUserReducer: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
      return state;
    },
  },
});

export const { addExistingUser, signUpUserReducer } = loginReducer.actions;
export default loginReducer.reducer;
