import React, { useEffect } from "react";
import { UserModel } from "../../models/user.model";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../saga/sagaActions";
import { Link } from "react-router-dom";
import "../forms/form.css";
import Google from "../../assets/google.png";
import Apple from "../../assets/apple.png";
import Facebook from "../../assets/facebook.png";
import { RootState } from "../../redux/store/store";
import Header from "../common/header/header.component";

type LoginInput = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.login.isUserAuthenticated
  );
  const onSubmit = (e: LoginInput) => {
    const user = new UserModel(e.email, e.password);
    dispatch({ type: sagaActions.AUTHENTICATE_USER, payload: user });
  };
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, [isUserAuthenticated]);
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2 className="heading"> Log into your LearnDemy Account </h2>
        <div className="social-media-buttons">
          <button className="social-media-btn">
            <img alt="google-logo" src={Google} />
            <span>Continue with Google</span>
          </button>
          <button className="social-media-btn">
            <img alt="facebook-Logo" src={Facebook} />
            <span>Continue with Facebook</span>
          </button>
          <button className="social-media-btn">
            <img alt="apple-Logo" src={Apple} />
            <span>Continue with Apple</span>
          </button>
        </div>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="Email"
            placeholder="Email"
            className="form-input"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>Email Id is required !</p>
          )}

          <input
            type="password"
            placeholder="password"
            className="form-input"
            {...register("password", {
              required: true,

              validate: {
                maxLength: (v) =>
                  v.length <= 20 ||
                  "The password should have at most 20 characters",
                matchPattern: (v) =>
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(v) ||
                  "The password you have entered should have minimum length 8, 1 capital letter, 1 numeric and 1 alphanumeric",
              },
            })}
          />

          {errors.password && (
            <p style={{ color: "red" }}>
              {errors.password.message === ""
                ? "Password is required !"
                : "The password you have entered should have minimum length 8, 1 capital letter, 1 numeric and 1 alphanumeric"}
            </p>
          )}
          <br />
          <button className="form-control-btn">Log In</button>
        </form>
        <p className="alert">
          Don't have an account ? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </>
  );
}
