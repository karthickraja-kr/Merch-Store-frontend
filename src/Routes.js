import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts";
import Orders from "./admin/Orders";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/manage/product"
          exact
          component={ManageProduct}
        />
        <AdminRoute path="/admin/manage/order" exact component={Orders} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/cart" exact component={UserDashBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;
