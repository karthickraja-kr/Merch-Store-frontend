import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signIn, isAuthenticated, authenticate } from "../auth/helper";
import Base from "../core/Base";
import LoadingScreen from "../core/LoadingScreen";

const Signin = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = value;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValue({ ...value, error: false, [name]: event.target.value });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false, loading: true });
    signIn({ email, password })
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValue({
              ...value,
              email: "",
              password: "",
              loading: false,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log("Request failed"));
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="Email"
                value={email}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base>
      <div className="container py-4">
        <h5 className="text-center">Signin</h5>
        <p className="text-center">Enter your credentials to signin</p>
        {loading && <LoadingScreen />}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </div>
    </Base>
  );
};

export default Signin;
