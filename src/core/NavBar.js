import React from "react";
import logo from "../img/logo.png";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#0D0D0D",
    };
  } else {
    return {
      color: "#758283",
    };
  }
};

const NavBar = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light px-3">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img src={logo} alt="" height="30" width="95.8" />
          </div>
          <div id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                Cart
              </Link>
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                Dashboard
              </Link>
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                Admin Dashboard
              </Link>
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
              <Link
                style={currentTab(history, "/signout")}
                className="nav-link"
                to="/signout"
              >
                Signout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
