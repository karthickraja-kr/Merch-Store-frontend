import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [value, setValue] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    success: false,
  });

  const { name, lastname, email, password, error, success, loading } = value;

  const handleChange = (name) => (event) => {
    setValue({ ...value, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: false, loading: true });
    signUp({ name, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValue({
            ...value,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValue({
            ...value,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch();
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="loading-page">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your account was created successfully. please{" "}
            <Link to="/signin">Signin</Link> here.
          </div>
        </div>
      </div>
    );
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

  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="mb-3">
              <label>Firstname</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="mb-3">
              <label>Lastname</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>
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
              onClick={onSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <div className="container py-4">
        <h5 className="text-center">Signup</h5>
        <p className="text-center">Create your own account for free</p>
        {loadingMessage()}
        {successMessage()}
        {errorMessage()}
        {SignUpForm()}
      </div>
    </Base>
  );
};

export default Signup;
