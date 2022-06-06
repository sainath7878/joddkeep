import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import {
  BiList,
  BiPersonCircle,
  IcBaselineLogout,
} from "assets/icons/Icons.jsx";
import { useAuth, useNotes, useSidebar } from "context";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "assets/icons/Icons";
import { toast } from "react-toastify";

function Header() {
  const { authState, authDispatch } = useAuth();
  const { noteDispatch } = useNotes();
  const navigate = useNavigate();
  const timerId = useRef(null);
  const [searchData, setSearchData] = useState("");
  const location = useLocation();

  const setSearch = () => {
    noteDispatch({ type: "SET_SEARCH", payload: { searchData } });
  };

  const debounce = function (callback, delay = 500) {
    return function () {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => callback(), delay);
    };
  };

  const debouncingMethod = debounce(setSearch, 500);

  const logoutHandler = () => {
    authDispatch({ type: "LOGOUT" });
    toast.info("Logged out");
    navigate("/");
  };
  const { setShowSidebar } = useSidebar();
  return (
    <header>
      <nav className="navigation d-flex">
        <div className="nav-section d-flex align-center">
          <button className="btn btn-secondary d-none mobile-view hamburger">
            <BiList
              className="fs-m"
              onClick={() => setShowSidebar((prev) => !prev)}
            />
          </button>
          <Link to="/">
            <p className="nav-brand-link mr-sm">
              {" "}
              JODD<span className="brand-text">Keep</span>
            </p>
          </Link>
        </div>
        {location.pathname !== "/" && (
          <div className="search">
            <input
              type="text"
              placeholder="Search for Notes"
              className="form-input"
              value={searchData}
              onChange={(e) => {
                location.pathname !== "/notes" && navigate("/notes");
                setSearchData(() => e.target.value);
              }}
              onKeyUp={() => debouncingMethod()}
            />
            <BiSearch className="search-icon" />
          </div>
        )}

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
      {location.pathname !== "/" && (
        <div className="search-responsive">
          <input
            type="text"
            placeholder="Search for Notes"
            className="form-input"
            value={searchData}
            onChange={(e) => {
              location.pathname !== "/notes" && navigate("/notes");
              setSearchData(() => e.target.value);
            }}
            onKeyUp={() => debouncingMethod()}
          />
          <BiSearch className="search-icon-responsive" />
        </div>
      )}
    </header>
  );
}

export { Header };
