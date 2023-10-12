import React, { createContext } from "react";
import { useGetAuthenticateUserStatus } from "../../utils/hooks/useGetAuthenticateUserStatus";

const AuthContext = createContext({ isLoggedIn: true });

export default function AuthProvider(props: any) {
  let userStatus = useGetAuthenticateUserStatus();
  return (
    <AuthContext.Provider value={{ isLoggedIn: userStatus || false }}>
      {props.children}
    </AuthContext.Provider>
  );
}
