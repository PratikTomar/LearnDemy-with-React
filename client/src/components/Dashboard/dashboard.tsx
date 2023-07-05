import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/header/header.component";
import GetUserFromServer from "../hooks/getUserHook";

export default function DashBoard() {
  return (
    <>
    <GetUserFromServer>
      <Header />
      </GetUserFromServer>
      <Outlet />
    </>
  );
}
