import React from "react";
import { Link } from "react-router-dom";
import "./headerButton.css";

type ButtonProps = {
  label: string;
};

const HeaderButton = (props: ButtonProps): JSX.Element => {
  const { label } = props;
  const getButtonStyle = () => {
    if (label.toLowerCase() === "log in") {
      return "button-login";
    }
    return "button-signup";
  };

  return (
    <Link
      to={`/${label.toLowerCase() === "log in" ? "" : "signup"}`}
      className={`btn-header ${getButtonStyle()}`}
    >
      {label}
    </Link>
  );
}

export default HeaderButton;
