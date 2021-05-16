import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const UserDashBoard = () => {
  const { user } = isAuthenticated();
  return (
    <Base>
      <div className="container p-4">
        <h4 className="text-center">User Dashboard</h4>
        <h5 className="py-4 text-secondary">Hi {user.name}...</h5>
        <h5>Your Orders</h5>
      </div>
    </Base>
  );
};

export default UserDashBoard;
