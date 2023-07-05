import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../saga/sagaActions";

export default function GetUserFromServer({ children }:any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: sagaActions.GET_USER });
  }, []);
  return children;
}
