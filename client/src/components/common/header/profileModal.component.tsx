import React from "react";
import "./profileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { UserModel } from "../../../models/user.model";
import { signUpUser, logOutUser } from "../../../redux/reducer/auth.reducer";
import { RootState } from "../../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";

type ModalProps = {
  user: UserModel;
  ref: any;
};

const ProfileModal = (props: ModalProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const logOutHandler = ()=> {
    localStorage.removeItem("auth-token");
    dispatch(logOutUser())
    navigate('/');
  }

  return (
    <div id="Modal" className="profile-modal-container" ref={props.ref}>
      <div className="detail-container">
        <div className="name-symbol">{props.user.name?.slice(0, 2)}</div>
        <div className="profile-details">
          <div className="full-name">{props.user.name}</div>
          <div className="email-address">{props.user.email}</div>
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
            <button className="log-out" onClick={logOutHandler}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileModal;