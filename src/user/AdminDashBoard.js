import React from "react";
import { isAuthenticated } from "../auth/helper";
import Admin from "./Admin";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <Admin>
      <div className="container">
        <h5 p-4>Hi {name}</h5>
        <p className="text-secondary">
          {email}{" "}
          {role === 1 && <span class="badge bg-success m-1">Admin</span>}
        </p>
      </div>
    </Admin>
  );
};

export default AdminDashBoard;
