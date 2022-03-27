import React from "react";
import { Link  } from "react-router-dom";

import "./header.css";

import {
  BiList,
  BiPersonCircle
} from "assets/icons/Icons.jsx";

function Header() {
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
            <Link to="/signin">
              <BiPersonCircle className="fs-ml nav-link" />
            </Link>
            <p>Hi user</p>
          </div>
        </nav>
      </header>
    </div>
  );
}

export { Header };