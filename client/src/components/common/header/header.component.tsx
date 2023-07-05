import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { addExistingUser } from "../../../redux/reducer/auth.reducer";
import HeaderButton from "./headerButton.component";
import ProfileModal from "./profileModal.component";
import SearchBar from "./searchBar.component";

export default function Header() {
  const reference = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.login.isUserAuthenticated
  );
  const cartItems = useSelector((state: RootState) => state.cart);

  const [showModal, setShowModal] = useState(false);

  window.addEventListener(
    "click",

    () => {
      if (!reference) {
        setShowModal(false);
      }
    },
    true
  );

  const user = useSelector((state: RootState) => state.login.user);

  useEffect(() => {
    if (localStorage["auth-token"]) {
      dispatch(addExistingUser({ user, isUserAuthenticated: true }));
    }
  }, []);

  return (
    <header className="container">
      <Link to={"/dashboard"} className="title">
        <img src={logo} alt="Logo" />
      </Link>
      <SearchBar />
      <div className="buttons-container">
        {isUserAuthenticated && (
          <>
            <p className="header-items">My learnings</p>
            <p className="header-items">
              <i className="fa-regular fa-heart fa-xl" />
            </p>
          </>
        )}
        <p className="header-items">
          {isUserAuthenticated && (
            <>
              <i className="fa-solid fa-cart-shopping" />
              <div className="cart-count-container">
                <Link to={"/dashboard/cart"} className="cart-url">
                  <p className="cart-count">{cartItems.length}</p>
                </Link>
              </div>
            </>
          )}
        </p>

        {user?.name && isUserAuthenticated && (
          <button
            className="user-name header-items"
            onClick={() => setShowModal(true)}
          >
            {user?.name?.slice(0, 2)}
          </button>
        )}
        <div className="model-container">
          {showModal && <ProfileModal ref={reference} user={user} />}
        </div>
        {!isUserAuthenticated && (
          <>
            <HeaderButton label={"Login"} />
            <HeaderButton label={"Signup"} />
          </>
        )}
      </div>
    </header>
  );
}
