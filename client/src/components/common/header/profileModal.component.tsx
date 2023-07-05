import React from "react";
import "./profileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UserModel } from "../../../models/user.model";
import { addExistingUser } from "../../../redux/reducer/auth.reducer";
import { RootState } from "../../../redux/store/store";
import { Link } from "react-router-dom";

type modalProps = {
  user: UserModel;
  ref: any;
};

export default function ProfileModal(props: modalProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.login.user);

  const { name, email } = props.user;
  return (
    <div id="Modal" className="profile-modal-container" ref={props.ref}>
      <div className="detail-container">
        <div className="name-symbol">{name?.slice(0, 2)}</div>
        <div className="profile-details">
          <div className="full-name">{name}</div>
          <div className="email-address">{email}</div>
        </div>
      </div>
      <div className="list-of-actions-container">
        <ul className="list-of-actions">
          <li className="action-items">My Learning</li>
          <li className="action-items">
          <Link className="action-items" to={"/dashboard/cart"}>My Cart</Link>
            </li>
          <li className="action-items">Help</li>
          <li className="action-items">
            <button className="log-out" onClick={()=> {
              localStorage["auth-token"] = ""
              dispatch(addExistingUser({ user, isUserAuthenticated: false }))
              navigate('/');
            }}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
