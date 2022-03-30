import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import {
  BiList,
  BiPersonCircle,
  IcBaselineLogout,
} from "assets/icons/Icons.jsx";
import { useAuth } from "context";
import { useNavigate } from "react-router-dom";

function Header() {
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authDispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div>
      <header>
        <nav className="navigation d-flex">
          <div className="nav-section d-flex align-center">
            <button className="btn btn-secondary d-none mobile-view hamburger">
              <BiList className="fs-m" />
            </button>
            <Link to="/">
              <p className="nav-brand-link mr-sm">
                {" "}
                JODD<span className="brand-text">Keep</span>
              </p>
            </Link>
          </div>

          <div className="nav-section login">
            {authState.isLoggedIn ? (
              <>
                <IcBaselineLogout
                  className="fs-ml nav-link logout"
                  onClick={() => logoutHandler()}
                />
                <p>Hi, {authState.firstName}</p>
              </>
            ) : (
              <Link to="/signin">
                <BiPersonCircle className="fs-ml nav-link" />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export { Header };
