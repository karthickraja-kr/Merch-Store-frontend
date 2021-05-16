import React from "react";
import { Link, withRouter } from "react-router-dom";
import Base from "../core/Base";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return "nav-link active";
  } else {
    return "nav-link";
  }
};

const adminPanelLinks = (history) => {
  return (
    <ul class="nav flex-column nav-pills bg-light">
      <li class="nav-item py-2">
        <Link
          to="/admin/dashboard"
          className={currentTab(history, "/admin/dashboard")}
        >
          Overview
        </Link>
      </li>
      <li class="nav-item py-2">
        <Link
          to="/admin/create/category"
          className={currentTab(history, "/admin/create/category")}
        >
          Add Categories
        </Link>
      </li>
      <li class="nav-item py-2">
        <Link
          to="/admin/manage/category"
          className={currentTab(history, "/admin/manage/category")}
        >
          Manage Categories
        </Link>
      </li>
      <li class="nav-item py-2">
        <Link
          to="/admin/create/product"
          className={currentTab(history, "/admin/create/product")}
        >
          Add Product
        </Link>
      </li>
      <li class="nav-item py-2">
        <Link
          to="/admin/manage/product"
          className={currentTab(history, "/admin/manage/product")}
        >
          Manage Product
        </Link>
      </li>
      <li class="nav-item py-2">
        <Link
          to="/admin/manage/order"
          className={currentTab(history, "/admin/manage/order")}
        >
          Manage Order
        </Link>
      </li>
    </ul>
  );
};

const Admin = ({ children, history }) => {
  return (
    <Base>
      <div className="container py-4">
        <h4 className="text-center">Welcome to Admin dashboard</h4>
        <p className="text-center">
          Access and manage all your products and orders
        </p>
        <div className="row py-3">
          <div className="col-3 bg-light p-3 rounded">
            {adminPanelLinks(history)}
          </div>
          <div className="col-9 p-4">{children}</div>
        </div>
      </div>
    </Base>
  );
};

export default withRouter(Admin);
