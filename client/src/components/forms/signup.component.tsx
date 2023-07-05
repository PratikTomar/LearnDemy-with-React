import React from "react";
import { UserModel } from "../../models/user.model";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../saga/sagaActions";
import { Link } from "react-router-dom";
import "../forms/form.css";
import Header from "../common/header/header.component";
import { RootState } from "../../redux/store/store";

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (e: SignUpInput) => {
    const user = new UserModel(e.email, e.password, e.name);
    dispatch({ type: sagaActions.ADD_NEW_USER, payload: user });
    navigate("/dashboard");
  };
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2 className="heading">Sign up and start Learning</h2>

        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
            {...register("name", { required: true })}
          />
          {errors.name && <p style={{ color: "red" }}>Name is required !</p>}

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
            placeholder="Password"
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

          <button className="form-control-btn">Sign Up</button>
        </form>
        <p className="alert">
          Already have an account ? <Link to={"/login"}>Log In</Link>
        </p>
      </div>
    </>
  );
}
