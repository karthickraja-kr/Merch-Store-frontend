import React from "react";
import logo from "../img/logo.png";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth/helper";

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
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="25"
                  fill="currentColor"
                  className="bi bi-bag-check-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />
                </svg>
                {"  "}
                Cart
              </Link>
              {!isAuthenticated() && (
                <>
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
                </>
              )}
              {isAuthenticated() && (
                <span
                  className="nav-link text-warning"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    signOut(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(NavBar);
