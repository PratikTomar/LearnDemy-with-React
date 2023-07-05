import React from "react";
import { Link } from "react-router-dom";
import "./headerButton.css";

type buttonProps = {
  label: String;
};

export default function HeaderButton(props: buttonProps): JSX.Element {
  const { label } = props;
  return (
    <Link
      to={`/${label.toLowerCase() === "login" ? "" : "signup"}`}
      className={`login-buttons ${label}-style`}
    >
      {label}
    </Link>
  );
}
