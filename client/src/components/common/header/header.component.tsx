import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { loginUser, signUpUser } from "../../../redux/reducer/auth.reducer";
import HeaderButton from "./headerButton.component";
import ProfileModal from "./profileModal.component";
import SearchBar from "./searchBar.component";

const Header = () => {
  const reference = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserAuthenticated
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

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      dispatch(loginUser({ isUserAuthenticated: true, user }));
    }
  }, []);

  const userModalHandler = () => {
    setShowModal(true);
  };

  const renderCartCount = () => {
    if (isUserAuthenticated) {
      return (
        <>
          <i className="fa-solid fa-cart-shopping" />
          <div className="cart-count-container">
            <Link to={"/dashboard/cart"} className="cart-url">
              <p className="cart-count">{cartItems.length}</p>
            </Link>
          </div>
        </>
      );
    }
  };

  const renderUserName = () => {
    if (user?.name && isUserAuthenticated) {
      return (
        <button className="user-name header-items" onClick={userModalHandler}>
          {user.name.slice(0, 2)}
        </button>
      );
    }
  };

  const renderAuthenticationButtons = () => {
    if (!isUserAuthenticated) {
      return (
        <>
          <HeaderButton label="Log in" />
          <HeaderButton label="Sign up" />
        </>
      );
    }
  };

  return (
    <header className="container">
      <Link to={"/dashboard"} className="title">
        <img src={logo} alt="Learndemy Logo" />
      </Link>
      <SearchBar />
      <div className="buttons-container">
        {isUserAuthenticated && (
          <>
            <p className="header-text">My learnings</p>
            <p className="header-items">
              <i className="fa-regular fa-heart fa-xl" />
            </p>
          </>
        )}
        <span className="header-items">{renderCartCount()}</span>
        {renderUserName()}
        <div className="model-container">
          {showModal && <ProfileModal ref={reference} user={user} />}
        </div>
        {renderAuthenticationButtons()}
      </div>
    </header>
  );
};

export default Header;
