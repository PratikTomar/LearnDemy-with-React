import React, { createContext } from "react";
import { useGetAuthenticateUserStatus } from "../hooks/authorizeHook";

const AuthContext = createContext({ isLoggedIn: true });

export default function AuthProvider(props: any) {
  let userStatus = useGetAuthenticateUserStatus();
  return (
    <AuthContext.Provider value={{ isLoggedIn: userStatus || false }}>
      {props.children}
    </AuthContext.Provider>
  );
}
