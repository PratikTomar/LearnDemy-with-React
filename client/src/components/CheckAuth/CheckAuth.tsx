import React from "react";
import { Navigate } from "react-router-dom";
import { useGetAuthenticateUserStatus } from "../hooks/authorizeHook";

const CheckAuth = (props : any) => {
  let userStatus = useGetAuthenticateUserStatus();

  if (!userStatus) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export default CheckAuth;
